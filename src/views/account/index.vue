<template>
  <div class="containerWrap accountWrap">
    <div class="accountContainer">
      <div class="navWrap">
        <span :class=" navIndex===0 ? 'active' : '' " @click="toggleNav(0)">基本信息</span>
        <span :class=" navIndex===1 ? 'active' : '' " @click="toggleNav(1)">认证信息</span>
        <span :class=" navIndex===2 ? 'active' : '' " @click="toggleNav(2)">私钥下载</span>
      </div>

      <div class="content">

        <div v-show="navIndex===0">
          <BaseInfo
            :avatar="avatar"
            :userInfo="userInfo"
            :verifyStatus="verifyStatus"
            :editUsernameVisible="editUsernameVisible"
            :bindPhoneVisible="bindPhoneVisible"
            @changeVisibleFlag="changeVisibleFlag"/>
        </div>

        <div v-show="navIndex===1">
          <Authentication
            :userInfo="userInfo"
            :verifyStatus="verifyStatus"/>
        </div>



        <div class="downloadWrap" v-show="navIndex===2">

          <div class="download" >
            <div class="topTips">
               <svg-icon icon-class="warn" class="icon"/>
              <span>
                温馨提示：私钥是您在区块链的身份标识，请注意保管！
              </span>
            </div>
            <el-button 
              style="margin-top:20px" 
              type="primary"
              @click="download">下载私钥</el-button>
          </div>

          <div class="download">
            <div class="topTips">
               <svg-icon icon-class="warn" class="icon"/>
              <span>
                温馨提示：您已经下载过私钥并绑定公钥地址，<router-link to="">如果私钥丢失，请联系杨坤团队！!</router-link>
              </span>
            </div>
            <p>公钥地址ec0cbf134505c4e182c621b7d243114e138c78cf</p>
          </div>



        </div>

      </div>





    </div>
  </div>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'


  import { getVerifyStatusText } from '@/utils/index.js'
  import { downloadPrivatekey } from '@/api/user.js'

  import BaseInfo from './components/BaseInfo'
  import Authentication from './components/Authentication'
  export default {
    components:{
      BaseInfo,
      Authentication
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'userInfo',
        'verifyStatus'
      ])
    },
    created(){


    },
    data() {

      return {
        navIndex: 0,
        editUsernameVisible: false,
        bindPhoneVisible: false,


      }
    },
    methods: {
      toggleNav(index) {
        this.navIndex = index
      },
      changeVisibleFlag(key, val){
        this[key] = val;
      },
      download(){
        var formdata = new FormData()
        formdata.append('email', this.userInfo.email)
        downloadPrivatekey(formdata)
          .then((data)=>{
            console.log(data,888)
          })
      }





    }
  }
</script>

<style lang="scss">
  .accountContainer {
    .navWrap {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      margin-bottom: -1px;

      >span {
        height: 40px;
        margin: 0;
        margin-right: 2px;
        padding: 0 16px;
        line-height: 38px;
        background: #fafafa;
        border: 1px solid #e8e8e8;
        border-radius: 0 0 0 0;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        margin-right: 4px;
        background-color: #E4E8EC;
        color: #7E818F;
        font-weight: 500;
        cursor: pointer;

        &.active {
          background: #fff;
          border-bottom-color: #fff;
          color: #333;
        }
      }
    }

    .content {
      background-color: #fff;
      border: 1px solid #e7ebf0;
      padding: 20px;


      .downloadWrap {
        .download{
          p{
            padding-top:28px;
            color:#333;
          }
        }
      }

    }

  }
</style>
