<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">{{ from === 'origin' ?'设置密码' : '重置密码' }}</h3>
      </div>

      <el-form-item prop="password1">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password1"
          :type="passwordType1"
          placeholder="设置密码"
          name="password1"
          tabindex="1"
          auto-complete="on"/>
        <span class="show-pwd" @click="showPwd(1)">
          <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="password2">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password2"
          v-model="loginForm.password2"
          :type="passwordType2"
          placeholder="确认密码"
          name="password2"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd(2)">
          <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>



      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="_submit"
      >{{ from === 'origin' ? '设置密码' : '重置密码' }}</el-button>

      <el-row>
        <el-col style="text-align:center;color:#999;font-size:14px;">
          <el-button type="text" @click.native.prevent="$router.push('login')">返回登录</el-button>
        </el-col>
      </el-row>



    </el-form>
  </div>
</template>

<script>
  import { MessageBox, Message } from 'element-ui'
  import { PASSWORDREG } from '@/utils/index.js'
  import { register, retrive } from '@/api/user.js'
  import { setToken } from '@/utils/auth'

  export default {
    name: 'Login',
    data() {

      const validatePassword1 = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        }else if(!PASSWORDREG.test(value)){
          callback(new Error('密码必须包含字母、数字或者特殊符号任意两种'))
        } else {
          callback()
        }
      }

      const validatePassword2 = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        }else if(!PASSWORDREG.test(value)){
          callback(new Error('密码必须包含字母、数字或者特殊符号任意两种'))
        }else if(this.loginForm.password1 !== this.loginForm.password2){
           callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      return {
        email: '',
        from: '',
        checked: true,
        loginForm: {
          password1: '',
          password2: ''
        },
        loginRules: {

          password1: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword1
          }],
          password2: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword2
          }]
        },
        loading: false,
        passwordType1: 'password',
        passwordType2: 'password',
        redirect: undefined
      }
    },
    created(){
      const query = this.$route.query;
      const email = query.email;
      const from = query.from;

      this.email = email;
      this.from = from;

    },
    methods: {
      openAgreement(){
        let routeUrl = this.$router.resolve({
              path: "/serviceAgreement",
         });
         window.open(routeUrl .href, '_blank');
      },

      showPwd(index) {
        if (this['passwordType'+index] === 'password') {
          this['passwordType'+index] = ''
        } else {
          this['passwordType'+index] = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      _submit() {

        var submitFn = this.from === 'origin' ? register : retrive

        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true

            var formdata = new FormData()
            formdata.append('email', this.email)
            formdata.append('password', this.loginForm.password1)

            submitFn(formdata)
              .then((data)=>{
                if(data.error_code === 200){
                  var msg = this.from === 'origin' ? '设置成功' : '修改成功'
                  Message({
                    message: msg,
                    type: 'success',
                    duration: 2000
                  })

                  setTimeout(()=>{
                    this.$store.commit('SET_TOKEN', this.email)
                    setToken(this.email)

                    this.$router.push({path: '/' });
                  },2000)

                }else{
                  this.loading = false
                }

                
              })
              .catch((err)=>{
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
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
