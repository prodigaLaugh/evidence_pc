<template>
  <div class="containerWrap personalAuthenticationWrap">
    <div class="container">
      <div class="topTips">
         <svg-icon icon-class="warn" class="icon"/>
        <span>
          温馨提示：通过认证后即可拥有区块链服务，一个账号只能认证一种用户类型，请妥善选择。
        </span>
      </div>

      <div class="content">
        <el-form
          ref="personForm"
          :model="personForm"
          :rules="personRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
          label-width="140px">

          <el-form-item label="用户类型">
            <el-input
              ref="username"
              value="企业用户"
              placeholder="用户类型"
              name="email"
              type="text"
              tabindex="1"
              auto-complete="on"
              readonly="readonly"
            />
          </el-form-item>
          <el-form-item prop="companyName" label="企业名称">
            <el-input
              ref="companyName"
              v-model="personForm.companyName"
              placeholder="请输入企业名称"
              name="companyName"
              type="text"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="companyLocation" label="企业地址">
            <el-input
              ref="companyLocation"
              v-model="personForm.companyLocation"
              placeholder="请输入企业地址"
              name="companyLocation"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="companyCreditCode" label="社会信用代码">
            <el-input
              ref="companyCreditCode"
              v-model="personForm.companyCreditCode"
              placeholder="请输入社会信用代码"
              name="companyCreditCode"
              type="text"
              tabindex="4"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="tradingCertificate" label="营业执照">
            <div class="uploadWrap" @click="triggerFile('tradingCertificate')">
              <div class="imgWrap">
                <img
                  :src="personForm.tradingCertificate ? personForm.tradingCertificate : require('@/assets/account/company.png')"
                  alt=""
                />
              </div>
              <div class="textWrap">
                <p>1、支持的图片格式包括 JPG、JPEG 和 PNG</p>
                <p>2、上传的图片需清晰完整，图片大小不得超过5MM</p>
              </div>
              <el-button>上传图片</el-button>
              <input
                type="file"
                ref="tradingCertificate"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="selectFile('tradingCertificate', $event)"/>
            </div>
          </el-form-item>


          <el-form-item label="">
            <div style="padding-top:30px;">
              <el-button @click="submit"  :loading="loading">提交</el-button>
              <el-button @click="$router.go(-1)">返回</el-button>
            </div>

          </el-form-item>

        </el-form>

      </div>

    </div>
  </div>
</template>

<script>
  import { MessageBox, Message } from 'element-ui'
  import {
    mapGetters
  } from 'vuex'
  import { validUsername } from '@/utils/validate'
  import { enterpriseCertification } from '@/api/user.js'

  export default{
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created(){
      const email = this.userInfo.email
      this.personForm.email = email
    },
    data(){
      const validateRealName = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入企业名称'))
        } else {
          callback()
        }
      }
      const validateIdNumbere = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入企业地址'))
        } else {
          callback()
        }
      }
      const validateIdObverseSide = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入企业信用代码'))
        } else {
          callback()
        }
      }
      const validateIdReverseSide = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('企业营业执照照片'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        personForm:{
          email: '',
          companyName: '',
          companyLocation: '',
          companyCreditCode: '',
          tradingCertificate: '',
        },
        tradingCertificate: '',
        personRules:{
          companyName: [{ required: true, trigger: 'blur', validator: validateRealName }],
          companyLocation: [{ required: true, trigger: 'blur', validator: validateIdNumbere }],
          companyCreditCode: [{ required: true, trigger: 'change', validator: validateIdObverseSide }],
          tradingCertificate: [{ required: true, trigger: 'change', validator: validateIdReverseSide }],
        },

      }
    },
    methods:{
      triggerFile(dom){
        this.$refs[dom].click()
      },
      selectFile(dom, e){
        this[dom] = e.target.value;

        var upload = this.$refs[dom];
        var file = upload.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) =>{
          this.personForm[dom] =  reader.result;
        }
      },
      submit(){
        this.$refs.personForm.validate(valid => {
          if (valid) {
            this.loading = true

            var formdata = new FormData();
            formdata.append('email', this.personForm.email)
            formdata.append('companyName', this.personForm.companyName)
            formdata.append('companyLocation', this.personForm.companyLocation)
            formdata.append('companyCreditCode', this.personForm.companyCreditCode)
            formdata.append('tradingCertificate', this.tradingCertificate)

          tradingCertificate: '',

            enterpriseCertification(formdata)
              .then((data)=>{
                if(data.error_code === 200){
                  Message({
                    message: '提交成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.$store.dispatch('user/queryVerifyStatus')
                  this.$store.dispatch('user/getInfo')
                  setTimeout(()=>{
                    this.$router.go(-1)
                  }, 2000);
                  
                }
                this.loading = false
              })
              .catch(()=>{
                this.loading = false
              })

          } else {
            console.log('error submit!!')
            return false
          }
        })
      }

    }
  }
</script>

<style lang="scss">
  .personalAuthenticationWrap{
    .content{
      padding:40px 0 40px;
      width:500px;
      .uploadWrap{
        cursor: pointer;
        .imgWrap{
          width: 252px;
          height: 166px;
          overflow: hidden;
          border: 1px solid #d6dce4;
          position:relative;
        }
        img{
          position:absolute;
          left:50%;
          top:50%;
          transform: translate(-50%,-50%);
          max-width:255px;
          max-height:166px;
        }
        .textWrap{
          padding:10px 0;
          p{
            font-size: 12px;
            font-weight: 400;
            color: #818593;
            line-height: 17px;
          }
        }
        input[type=file]{
          display:none;
        }

      }
    }
  }

</style>
