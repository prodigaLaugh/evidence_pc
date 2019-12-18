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
              value="个人用户"
              placeholder="用户类型"
              name="email"
              type="text"
              tabindex="1"
              auto-complete="on"
              readonly="readonly"
            />
          </el-form-item>
          <el-form-item prop="realName" label="姓名">
            <el-input
              ref="realName"
              v-model="personForm.realName"
              placeholder="请输入姓名"
              name="realName"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="idNumber" label="身份证号码">
            <el-input
              ref="idNumber"
              v-model="personForm.idNumber"
              placeholder="请输入身份证号码"
              name="idNumber"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="idReverseSide" label="身份证国徽面">
            <div class="uploadWrap" @click="triggerFile('idReverseSide')">
              <div class="imgWrap">
                <img
                  :src="personForm.idReverseSide ? personForm.idReverseSide : require('@/assets/account/person1.png')"
                  alt=""
                />
              </div>
              <div class="textWrap">
                <p>1、支持的图片格式包括 JPG、JPEG 和 PNG</p>
                <p>2、上传的图片需清晰完整，图片大小不得超过5M</p>
              </div>
              <el-button>上传图片</el-button>
              <input
                type="file"
                ref="idReverseSide"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="selectFile('idReverseSide', $event)"/>
            </div>
          </el-form-item>

          <el-form-item prop="idObverseSide" label="手持身份证照片">
            <div class="uploadWrap" @click="triggerFile('idObverseSide')">
              <div class="imgWrap">
                 <img
                  :src="personForm.idObverseSide ? personForm.idObverseSide : require('@/assets/account/person2.png')"
                  alt=""
                />
              </div>

              <div class="textWrap">
                <p>1、确保身份证手持于在胸前，不遮挡您的脸部</p>
                <p>2、支持的图片格式包括 JPG、JPEG 和 PNG</p>
                <p>3、上传的图片需清晰完整，图片大小不得超过5M</p>
              </div>
              <el-button>上传图片</el-button>
              <input
                type="file"
                ref="idObverseSide"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="selectFile('idObverseSide', $event)">
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
  import { personalAuthentication } from '@/api/user.js'

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
          callback(new Error('请输入姓名'))
        } else {
          callback()
        }
      }
      const validateIdNumbere = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入身份证号码'))
        } else {
          callback()
        }
      }
      const validateIdObverseSide = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请上传手持身份证照片'))
        } else {
          callback()
        }
      }
      const validateIdReverseSide = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请上传身份证国徽面'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        personForm:{
          email: '',
          realName: '',
          idNumber: '',
          idObverseSide: '',
          idReverseSide: '',
        },
        idObverseSide: '',
        idReverseSide: '',
        personRules:{
          realName: [{ required: true, trigger: 'blur', validator: validateRealName }],
          idNumber: [{ required: true, trigger: 'blur', validator: validateIdNumbere }],
          idObverseSide: [{ required: true, trigger: 'change', validator: validateIdObverseSide }],
          idReverseSide: [{ required: true, trigger: 'change', validator: validateIdReverseSide }],
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
            formdata.append('realName', this.personForm.realName)
            formdata.append('idNumber', this.personForm.idNumber)
            formdata.append('idObverseSide', this.idObverseSide)
            formdata.append('idReverseSide', this.idReverseSide)


            personalAuthentication(formdata)
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
