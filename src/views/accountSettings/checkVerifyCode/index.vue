<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      @submit.native.prevent>

      <div class="title-container">
        <h3 class="title" style="padding-bottom:30px;">输入验证码</h3>
      </div>

      <el-form-item prop="verifyCode">
        <span class="svg-container">
          &nbsp;
        </span>
        <el-input
          ref="verifyCode"
          v-model="loginForm.verifyCode"
          placeholder="请输入验证码"
          name="verifyCode"
          type="text"
          tabindex="1"
          auto-complete="on"
          @keyup.enter.native="_submit"
        />
      </el-form-item>



      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;margin-top:30px;"
        @click.native.prevent="_submit"
      >确定</el-button>

      <el-row>
        <el-col style="text-align:center;color:#999;font-size:14px;">
          <el-button type="text" @click.native.prevent="$router.push('/login')">返回登录</el-button>
        </el-col>
      </el-row>



    </el-form>
  </div>
</template>

<script>
  import {
    validUsername
  } from '@/utils/validate'

  import { checkVerificationCode } from '@/api/user.js'

  export default {
    name: 'Login',
    data() {


      const validateVerifyCode = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入验证码'))
        }else {
          callback()
        }
      }

      return {
        checked: true,
        loginForm: {
          verifyCode: '',
        },
        loginRules: {
          verifyCode: [{
            required: true,
            trigger: 'blur',
            validator: validateVerifyCode
          }]
        },
        loading: false,

      }
    },
    methods: {

      _submit() {
        console.log(111)
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            const query = this.$route.query;
            const email = query.email;
            const from = query.from;

            var formdata = new FormData();
            formdata.append('email', email)
             formdata.append('verifyCode', this.loginForm.verifyCode)
            formdata.append('type', '01')

            checkVerificationCode(formdata)
              .then( (data) =>{
                if(data.error_code === 200){
                  this.$router.replace({path: '/setPassword', query:{from: from, email: email} });
                }else{
                  this.loading = false
                }
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
