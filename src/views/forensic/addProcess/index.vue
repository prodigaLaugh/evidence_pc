<template>
  <div class="containerWrap certAddWrap">
    <div class="container">

      <div class="topTips">
        <svg-icon icon-class="warn" class="icon" />
        <span>
          温馨提示：点击“开始”即开始过程取证，在取证过程中请不要关闭浏览器，否则会导致过程取证失败</router-link>
        </span>
      </div>

      <div class="formWrap">
        <el-form
          ref="addParams"
          label-width="180px"
          label-position="left"
          :model="addParams"
          :rules="addRules"
        >

          <el-row style="padding-top:20px;border-bottom:1px solid #ddd;margin-bottom:30px;">
            <el-col :span="colLen">
               <el-form-item label="剩余使用次数" style="margin-bottom:10px;">
                 {{usageInfo.obtain_evidence_balance_number}}次
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="区块链配置">
                 <el-input value="M0" disabled="disabled"></el-input>
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="取证名称" prop="accessName">
                 <el-input
                  v-model="addParams.accessName"
                  placeholder="请输入取证名称"
                ></el-input>
               </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="colLen">
               <el-form-item label="私钥签名" prop="privateKeyFile">

                <el-button
                  size="small"
                  @click="triggerFile('privateKeyFile')"
                  type="primary"
                >上传私钥</el-button>
                 <div style="font-size:12px;color:#999;line-height:14px;">{{privateKeyFile}}</div>
                <input
                  type="file"
                  style="display:none"
                  ref="privateKeyFile"
                  @change="selectFile('privateKeyFile', $event)"
                />

               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="">
                <el-button @click="start" v-if="!isStart">开始</el-button>
                <el-button @click="complete" :loading="loading" v-else>完成</el-button>
                <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
               </el-form-item>
            </el-col>
          </el-row>

        </el-form>

      </div>


    </div>
  </div>
</template>

<script>
import RecordRTC from 'recordrtc'
import { MessageBox, Message } from 'element-ui'
import { mapGetters } from 'vuex'
import { validUsername } from '@/utils/validate'
import { uploadEvidence } from '@/api/depositCertificate'
export default {
  computed: {
    ...mapGetters([
      'userInfo',
    ])
  },
  data() {
    const validateAccessName = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入取证名称'))
      } else {
        callback()
      }
    }

    const validatePrivateKeyFile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请上传私钥文件'))
      } else {
        callback()
      }
    }

    return {
      colLen: 13,

      addParams: {
        accessName: '',
        evidenceFile: '',
        privateKeyFile: '',
        funcType: '08'
      },

      privateKeyFile: '',
      addRules: {
        accessName: [{ required: true, trigger: 'blur', validator: validateAccessName }],
        privateKeyFile: [{ required: true, trigger: 'blur', validator: validatePrivateKeyFile }],

      },
      index: 0,

      videoElem: null,
      isStart: false,
      loading: false,
      recorder: '',

      usageInfo: {}
    }
  },
  created() {
    this.usageInfo = JSON.parse( localStorage.usageInfo ? localStorage.usageInfo : "{}" )

    this.$nextTick(()=>{
      this.videoElem = this.$refs.video
      console.log(this.videoElem,88)
    })

  },
  methods: {
    start(){
      this.isStart = true
      this.getScreenStream((screen)=> {
          var recordingHints = {
              type: 'video'
          };
          // initiating the recorder
          this.recorder = RecordRTC(screen, recordingHints);
          // starting recording here
          this.recorder.startRecording();
      })

    },

    getScreenStream(callback) {
        if (navigator.getDisplayMedia) {
            navigator.getDisplayMedia({
                video: true
            }).then(screenStream => {
                callback(screenStream);
            });
        } else if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({
                video: true
            }).then(screenStream => {
                callback(screenStream);
            });
        } else {
            alert('getDisplayMedia API is not supported by this browser.');
        }
    },
    triggerFile(dom){
      this.$refs[dom].click()
    },
    selectFile(dom, e){
      var upload = this.$refs[dom];

      var file = upload.files[0]
      this[dom] = file.name;
      this.addParams[dom] = file;

    },
    complete(){
      this.recorder.stopRecording(() => {

          var blob = this.recorder.getBlob();
          var fileName = new Date().getTime();
          var fileObject = new File([blob], fileName, {
              type: 'video/webm'
          });
          this.addParams.evidenceFile = fileObject
          this.submit()
      });


    },
    getParams(){
      var formdata = new FormData()
      formdata.append('email', this.userInfo.email)
      formdata.append('accessName', this.addParams.accessName)
      formdata.append('privateKeyFile', this.addParams.privateKeyFile)
      formdata.append('evidenceFile', this.addParams.evidenceFile)

      formdata.append('funcType', this.addParams.funcType)
      return formdata

    },
    submit(){
      var formdata = this.getParams()
      this.$refs.addParams.validate(valid => {
        if (valid) {
          this.loading = true
          var formdata = this.getParams()

          uploadEvidence(formdata)
            .then((data)=>{
              if(data.error_code === 200){
                Message({
                  message: '提交成功',
                  type: 'success',
                  duration: 2000
                })

                setTimeout(()=>{
                  this.$router.go(-1)
                }, 2000);
              }
              this.loading = false
            })
            .catch(()=>{
              this.loading = false
            })
        }else{
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>


<style lang="scss">
  .certAddWrap{
    .el-upload__tip{
      line-height:14px;
    }
    .el-form-item__label{
      padding-left:36px;
    }
  }


</style>
