<template>
  <div class="containerWrap certAddWrap">
    <div class="container">

      <div class="topTips">
        <svg-icon icon-class="warn" class="icon" />
        <span>
          温馨提示：自行上传文件进行区块链存证，M0不提供内容真实性验证；如还未下载私钥，请先
          <router-link to="/account/index?nav=2">下载私钥</router-link>
        </span>
      </div>

      <div class="formWrap">
        <el-form
          ref="addParams"
          label-width="180px"
          label-position="left"
          :model="addParams"
          :rules="addRules">

          <el-row style="padding-top:20px;border-bottom:1px solid #ddd;margin-bottom:30px;">
            <el-col :span="colLen">
               <el-form-item label="剩余使用次数" style="margin-bottom:10px;">
                 {{usageInfo.deposit_evidence_balance_number}}次
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
            <el-col :span="colLen" prop="accessName">
               <el-form-item label="存证名称">
                 <el-input
                  v-model="addParams.accessName"
                  placeholder="请输入存证名称"
                ></el-input>
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
              <el-col :span="colLen">
                 <el-form-item label="共享对象(选填)" >
                    <div
                      class="shareTWrap"
                      v-for="(item,index) in shareTarget"
                      :key="index"
                      :style="{'margin-top':index>0 ? '15px' :'0'}">
                      <el-input
                        v-model="shareTarget[index]"
                        placeholder="请输入共享对象的账号"
                      ></el-input>

                      <div class="shareBtnWrap">
                          <el-button
                            type="primary"
                            @click="addShareTarget"
                            v-if="shareTarget.length-1 === index"
                          >+</el-button>
                          <el-button
                            type="primary"
                            @click="reduceShareTarget(index)"
                            v-if="shareTarget.length>1"
                          >-</el-button>
                      </div>
                    </div>

                   </el-form-item>
              </el-col>

            </el-form-item>

          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="存证类型">
                <div>
                  <el-button
                    :type="index===0?'primary':'btn'"
                    @click="index=0"
                  >文件存证</el-button>
                  <el-button
                    :type="index===1?'primary':'btn'"
                     @click="index=1"
                  >内容存证</el-button>
                </div>
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="" prop="evidenceFile" v-if="index===0">

                  <el-button
                    size="small"
                    type="primary"
                    @click="triggerFile('evidenceFile')"
                  >上传文件</el-button>
                  <div style="font-size:12px;color:#999;line-height:14px;">{{evidenceFile}}</div>
                  <div style="font-size:12px;color:#999;">上传文件大小不超过5M</div>
                  <input
                    type="file"
                    style="display:none"
                    ref="evidenceFile"
                    @change="selectFile('evidenceFile', $event)">

               </el-form-item>
               <el-form-item label="" prop="depositContent" v-else>

                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容,内容长度限制为500字符"
                    maxlength="500"
                    v-model="addParams.depositContent"
                  >
                  </el-input>

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
                <el-button @click="submit" :loading="loading">提交</el-button>
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
        callback(new Error('请输入存证名称'))
      } else {
        callback()
      }
    }
    const validateEvidenceFile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请上传存证文件'))
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
    const validateDepositContent = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    }
    return {
      colLen: 13,
      shareTarget: [''],
      addParams: {
        accessName: '',
        shareTarget: '',
        evidenceFile: '',
        privateKeyFile: '',
        depositContent: ''
      },
      evidenceFile: '',
      privateKeyFile: '',
      addRules: {
        accessName: [{ required: true, trigger: 'blur', validator: validateAccessName }],
        privateKeyFile: [{ required: true, trigger: 'blur', validator: validatePrivateKeyFile }],
        evidenceFile: [{ required: true, trigger: 'blur', validator: validateEvidenceFile }],
        depositContent: [{ required: true, trigger: 'blur', validator: validateDepositContent }]
      },
      index: 0,


      loading: false,

      usageInfo: {}
    }
  },
  created(){
    this.usageInfo = JSON.parse( localStorage.usageInfo ? localStorage.usageInfo : "{}" )
  },

  methods: {
    reduceShareTarget(index){
      this.shareTarget.splice(index,1)
    },
    addShareTarget(){
      this.shareTarget.push('')
    },
    triggerFile(dom){
      this.$refs[dom].click()
    },
    selectFile(dom, e){
      var upload = this.$refs[dom];

      var file = upload.files[0]
      this[dom] = file.name;
      this.addParams[dom] = file;
     
      // var reader = new FileReader()
      // reader.readAsDataURL(file)
      // reader.onload = (e) =>{
      //   this.personForm[dom] =  reader.result;
      // }
    },
    getParams(){
      this.addParams.shareTarget = this.shareTarget.join('|')
      var formdata = new FormData()
      formdata.append('email', this.userInfo.email)
      formdata.append('accessName', this.addParams.accessName)
      formdata.append('shareTarget', this.addParams.shareTarget)

      formdata.append('privateKeyFile', this.addParams.privateKeyFile)
      if(this.index === 0){
        formdata.append('evidenceFile', this.addParams.evidenceFile)
        formdata.append('fileType', this.addParams.evidenceFile.name.replace(/.*(?:\.)([^\.]+)/,'$1'))
      }else{
        formdata.append('depositContent', this.addParams.depositContent)
      }
      var type = this.index === 0 ? '05' : '06';
      formdata.append('funcType', type)
      return formdata

    },
    submit(){
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
    .shareTWrap{
      position:relative;
      .shareBtnWrap{
        padding-left:15px;
        position:absolute;
        left:100%;
        top:0;
        width:200px;
      }
    }
  }


</style>
