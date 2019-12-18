<template>
  <div class="verifyWrap" v-if="verifyInfo">
    <div class="nocerficationWrap"  v-if="verifyStatus==='00'">
      <div class="topTips">
         <svg-icon icon-class="warn" class="icon"/>
        <span>
          温馨提示：温馨提示：当前阶段，您尚未完成实名认证，无法购买和使用资源，请先完成认证！
        </span>
      </div>
      <div class="contentWrap">
        <div
          class="listWrap"
          v-for=" (item, index) in noCertificationLists"
          :key="index"
        >
          <div class="title">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
          </div>
          <ul>
            <li
              v-for="(list, k) in item.text"
              :key="k"
            ><span class="el-icon-success"></span>{{list}}</li>

          </ul>
          <el-button type="primary" @click="$router.push(item.path)">去认证</el-button>
        </div>
      </div>

    </div>

    <div class="successWrap"  v-if="verifyStatus==='02'">
      <div class="imgWrap">
        <img :src="require('@/assets/account/veriy.png')" alt="" />
      </div>
      <div class="rightWrap">
        <div>
          <img :src="require('@/assets/account/certification.png')" alt="">您已完成M0企业认证！
        </div>
        <p>
          {{ userInfo.verify_type === 1 ? '公司名称' : '真实姓名'}}：
          {{verifyInfo.company_name || verifyInfo.real_name}}
        </p>
        <p>
        {{userInfo.verify_type === 1 ? '社会信用代码' : '身份证号码' }}：
        {{verifyInfo.company_credit_code || verifyInfo.id_number,}}
        </p>
      </div>
    </div>

    <div class="failWrap"  v-else-if="verifyStatus==='03'">
      <div class="topTips">
         <svg-icon icon-class="warn" class="icon"/>

        <span>
          审核失败原因：平台方拒绝
        </span>
      </div>
      <div style="margin-bottom:28px"></div>

      <div class="failItemWrap">
        <span>用户类型</span>
        <div>
          <p>企业用户 审核失败</p>
        </div>
      </div>
      <div class="failItemWrap">
        <span>企业名称</span>
        <div>
          <p>深圳市三田雍泓互联网金融服务有限公司</p>
        </div>
      </div>
      <div class="failItemWrap">
        <span>企业地址</span>
        <div>
          <p>深圳市前海深港合作区临海大道59号海运中心主塔楼1001J</p>
        </div>
      </div>
      <div class="failItemWrap">
        <span>社会信用代码</span>
        <div>
          <p>9144030035916487XY</p>
        </div>
      </div>
      <div class="failItemWrap">
        <span>营业执照</span>
        <div>
          <img :src="require('@/assets/account/veriy.png')" alt="">
        </div>
      </div>

      <hr>

      <div class="failItemWrap">
        <span></span>
        <div>
          <el-button>重新认证</el-button>
          <el-button>切换个人用户</el-button>
        </div>
      </div>

    </div>

  </div>


</template>

<script>
 import { queryEnterpriseCertification, queryPersonalAuthentication } from '@/api/user.js'
export default {
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    verifyStatus: {
      type: String,
      default: ''
    },
  },
  data(){
    return {
      noCertificationLists: [
        {
          title: '个人用户',
          image:require('@/assets/account/verifyP.png'),
          text:[
            '可按需求拓展资源，即可随时删除退费',
            '可随时增加存证数目',
            '免费提供10次存证',
            '免费提供10次取证',
          ],
          path: '/account/person',
        },
        {
          title: '企业用户',
          image:require('@/assets/account/veriy.png'),
          text:[
            '可按需求拓展资源，即可随时删除退费',
            '可随时增加存证数目',
            '免费提供100次存证',
            '500M存证文件空间',
            '免费提供10次取证',
          ],
          path: '/account/company',
        }
      ],
      verifyInfo: null,

    }
  },
  created(){
    this.getVerifyInfo()
  },
  methods:{
    getVerifyInfo(){
      var type = this.userInfo.verify_type;
      var requestFn = type === 1 ? queryEnterpriseCertification : queryPersonalAuthentication;
      var formdata = new FormData()
      formdata.append('email', this.userInfo.email)

      requestFn(formdata)
        .then((data)=>{
          if(data.error_code === 200){
            this.verifyInfo = data.data
          }

        })
        .catch(()=>{})
    },

  }

}
</script>

<style lang="scss" scoped>
.verifyWrap {
  .contentWrap{
    overflow:hidden;
    >div{
      padding:40px 0;
      width:50%;
      float:left;
      text-align:center;
      .title{
        img{
          width:54px;
          height:42px;
        }
        p{
          font-size: 14px;
          font-weight: 500;
          color: #333437;
          line-height: 20px;
          margin-top: 14px;
          margin-bottom: 8px;
        }
      }
      ul{
        height: 118px;
        width:224px;
        margin:0 auto 24px;
        li{
          font-size: 12px;
          font-weight: 400;
          color: #999;
          text-align:left;
          margin-bottom: 8px;
          line-height:1.5;
          span{
            color: rgb(45, 127, 235);
            font-size: 12px;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .successWrap {
    padding-top: 84px;
    padding-bottom: 64px;
    display: flex;
    justify-content: center;

    .imgWrap {
      margin-right: 30px;

      img {
        width: 129px;
      }

    }

    .rightWrap {
      div {
        font-size: 18px;
        font-weight: 500;
        color: #333;
        line-height: 25px;
        padding-top: 4px;
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        img {
          width: 32px;
          margin-right: 16px;
        }
      }

      p {
        padding-left: 48px;
        font-size: 14px;
        font-weight: 400;
        color: #666;
        line-height: 20px;
        margin-top: 0;
        margin-bottom: 12px;
      }
    }
  }

  .failWrap{
    .failItemWrap{
      display: flex;
      justify-content: flex-start;
      margin-bottom: 28px;
      >span{
        width: 150px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 20px;
        padding: 6px 0;
        padding-left: 36px;
        margin-right: 64px;
        text-align: left;
      }
      >div{
        width: 252px;
        display: flex;
        align-items: center;

        p{
              padding: 6px 0;
              font-weight: 400;
              color: #666;
              line-height: 20px;
              margin: 0;
              display: inline-block;
        }
        img{
              height: 166px;
        }
      }
    }
    hr{
      background-color: #e7ebf0;
          border: none;
          height: 1px;
          margin-left: -36px;
          margin-bottom: 28px;
          margin-top: 0;
    }
  }

}

</style>
