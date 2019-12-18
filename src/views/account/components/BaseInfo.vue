<template>
  <div class="baseWrap" >
    <div class="personInfoWrap">

      <div class="left" @click="clickFileDom">
        <div class="personImgWrap">
          <img :src="avatar ? avatar : require('@/assets/overview/avatar.png')" alt="">
        </div>
        <el-button type="text" style="width:100%;">修改头像</el-button>
        <input
          ref="fileDom"
          type="file"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          :value="file"
          @change="selectFile"
          style="display:none"/>
      </div>

      <div class="right">
        <div>
          用户名：
          {{userInfo.name || '--'}} &nbsp;

          <img
            :src="verifyStatus==='02' ? require('@/assets/account/certification.png'):require('@/assets/account/noCertification.png')"
            alt=""
            width="20"
            height="20"
          />
        </div>

        <div>注册时间： {{userInfo.create_date || '--'}}</div>
      </div>

    </div>

    <div class="personItemWrap">
      <span>用户名</span>
      <span>{{userInfo.name || '--'}}</span>
      <el-button type="text" @click="changeVisible('editUsernameVisible', true)">修改</el-button>
    </div>
    <div class="personItemWrap">
      <span>密码</span>
      <span>*****</span>
      <el-button type="text" @click="editPassword">修改</el-button>
    </div>
    <div class="personItemWrap">
      <span>邮箱</span>
      <span>{{userInfo.email}}</span>
    </div>
    <div class="personItemWrap">
      <span>手机号</span>
      <span>{{userInfo.phone || '--'}}</span>
      <el-button type="text" @click=" changeVisible('bindPhoneVisible', true) " v-if="!userInfo.phone">绑定</el-button>
    </div>

    <el-dialog
      title="修改用户名"
      :visible.sync="editUsernameVisible"
      width="30%">
      <div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left">
          <el-form-item prop="user">
            <el-input
              ref="user"
              v-model="loginForm.user"
              type="text"
              placeholder="用户名"
              name="user"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUsernameVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="绑定手机号"
      :visible.sync="bindPhoneVisible"
      width="30%">
      <div>
        <el-form
          ref="bindPhoneForm"
          :model="bindPhoneForm"
          :rules="bindPhoneRules"
          class="login-form"
          auto-complete="on"
          label-position="left">
          <el-form-item prop="phone">
            <el-input
              ref="phone"
              v-model="bindPhoneForm.phone"
              type="text"
              placeholder="手机号"
              name="phone"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bindPhoneVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="bindPhone">确 定</el-button>
      </span>
    </el-dialog>


  </div>

</template>

<script>
  import { MessageBox, Message } from 'element-ui'
  import { validUsername } from '@/utils/validate.js'
  import { modifyAvatar, modifyUsername, sendVerificationCode, bindPhone } from '@/api/user.js'
export default {
  props: {
    verifyStatus: {
      type: String,
      required: true
    },
    userInfo: {
      type: Object,
      default: ''
    },
    editUsernameVisible: {
      type: Boolean,
      required: true
    },
    bindPhoneVisible: {
      type: Boolean,
      default: ''
    },
    avatar:[String, Object]
  },
  created(){
     this.loginForm.user = this.userInfo.name;
  },
  data(){
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入手机号'))
      }else if(!/^1[3456789]\d{9}$/.test(value)){
        callback(new Error('请输入正确的手机号'))
      }else {
        callback()
      }
    }

    return {
      file: '',

      loginForm: {
        user: '',
      },
      loginRules: {
        user: [{ required: true, trigger: 'blur', validator: validateUsername }],
      },
      loading: false,


      bindPhoneForm: {
        phone: '',
      },
      bindPhoneRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
      },

    }
  },
  methods:{
    clickFileDom(){
      this.$refs.fileDom.click()
    },
    selectFile(e){
      let upload = this.$refs.fileDom;
      var reader = new FileReader()
      reader.readAsDataURL(upload.files[0])
      reader.onload = (e) =>{
        var formdata = new FormData()
        formdata.append('email', this.userInfo.email)
        formdata.append('image', reader.result)
        
        modifyAvatar(formdata)
          .then((data)=>{
            if(data.error_code === 200){
              Message({
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.$store.dispatch('user/getAvatar')
            }
          })
      }

    },
    changeVisible(key, val){
      this.$emit('changeVisibleFlag', key, val);
    },

    editPassword(){
      let routeUrl = this.$router.resolve({
          path: "/sendVerificationCode",
          query: { from: 'reset', email: this.userInfo.email}
      });
      window.open(routeUrl .href, '_blank');

      // var formdata = new FormData();
      // formdata.append('email', this.userInfo.email)
      // sendVerificationCode(formdata)
      //   .then((data)=>{
      //     if(data.error_code === 200){
      //       let routeUrl = this.$router.resolve({
      //           path: "/checkVerifyCode",
      //           query: { from: 'reset', email: this.userInfo.email}
      //       });
      //       window.open(routeUrl .href, '_blank');

      //     }else{
      //       Message({
      //         message: data.error_msg,
      //         type: 'error',
      //         duration: 2000
      //       })
      //     }
      //   })

    },

    editUser(){
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true


          var formdata = new FormData();
          formdata.append('email', this.userInfo.email)
          formdata.append('userName', this.loginForm.user)

          modifyUsername(formdata)
            .then( (data) =>{
              if(data.error_code === 200){
                Message({
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
                this.changeVisible('editUsernameVisible', false)
                this.$store.dispatch('user/getInfo')
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
    },

    bindPhone(){
      this.$refs.bindPhoneForm.validate(valid => {
        if (valid) {
          this.loading = true


          var formdata = new FormData();
          formdata.append('email', this.userInfo.email)
          formdata.append('phone', this.bindPhoneForm.phone)

          bindPhone(formdata)
            .then( (data) =>{
              if(data.error_code === 200){
                Message({
                  message: '绑定成功',
                  type: 'success',
                  duration: 2000
                })

                this.changeVisible('bindPhoneVisible', false)
                this.$store.dispatch('user/getInfo')
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
    },



  }

}
</script>

<style lang="scss" scoped>
  .baseWrap {
    .personInfoWrap {
      padding-top: 8px;
      padding-left: 8px;
      display: flex;
      border-bottom: 1px solid #e7ebf0;
      padding-bottom: 18px;
  
      .left {
        margin-right: 34px;
  
        >.personImgWrap {
          width: 76px;
          height: 76px;
          border-radius: 76px;
          display: flex;
          justify-content: center;
          align-items: center;
  
          >img {
            max-width: 76px;
            max-height: 76px;
          }
        }
      }
  
      .right {
        >div {
          display: flex;
          align-items: center;
          margin-top: 12px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          line-height: 20px;
        }
  
      }
    }
  
    .personItemWrap {
      padding: 32px 30px;
      border-bottom: 1px dashed #e7ebf0;
      display: flex;
      align-items: center;
  
      >span:nth-of-type(1) {
        font-size: 14px;
        font-weight: 500;
        color: #333;
        line-height: 20px;
        width: 158px;
      }
  
      >span:nth-of-type(2) {
        text-align: left;
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        color: #666;
        line-height: 20px;
      }
  
      >button {
        font-size: 14px;
  
      }
    }
  
  }
  
  
</style>
