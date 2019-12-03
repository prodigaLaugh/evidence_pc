<template>
  <div class="containerWrap accountWrap">
    <div class="accountContainer">
      <div class="navWrap">
        <span :class=" navIndex===0 ? 'active' : '' " @click="toggleNav(0)">基本信息</span>
        <span :class=" navIndex===1 ? 'active' : '' " @click="toggleNav(1)">认证信息</span>
        <span :class=" navIndex===2 ? 'active' : '' " @click="toggleNav(2)">私钥下载</span>
      </div>

      <div class="content">

        <div class="baseWrap" v-show="navIndex===0">
          <div class="personInfoWrap">
            <div class="left">
              <div class="personImgWrap">
                <img src="../../assets/overview/avatar.png" alt="">
              </div>
              <el-button type="text" style="width:100%;">修改头像</el-button>
            </div>

            <div class="right">
              <div>用户名：dddd <img src="../../assets/overview/avatar.png" alt="" width="20" height="20"></div>
              <div>注册时间：2019-03-12</div>
            </div>

          </div>

          <div class="personItemWrap">
            <span>用户名</span>
            <span>ffdff</span>
            <el-button type="text">修改</el-button>
          </div>
          <div class="personItemWrap">
            <span>密码</span>
            <span>*****</span>
            <el-button type="text">修改</el-button>
          </div>
          <div class="personItemWrap">
            <span>邮箱</span>
            <span>3493@qq.com</span>
          </div>
          <div class="personItemWrap">
            <span>手机号</span>
            <span>1787998892323</span>
          </div>

        </div>

        <div class="verifyWrap" v-show="navIndex===1">
          <div class="successWrap"  v-if="false">
            <div class="imgWrap">
              <img src="../../assets/account/veriy.png" alt="" />
            </div>
            <div class="rightWrap">
              <div>
                <img src="../../assets/overview/avatar.png" alt="">您已完成飞洛印企业认证！
              </div>
              <p>企业名称：深圳市三田雍泓互联网金融服务有限公司</p>
              <p>社会信用代码：9144030035916487XY</p>
            </div>
          </div>

          <div class="failWrap">
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
                <img src="../../assets/account/veriy.png" alt="">
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

        <div class="downloadWrap" v-show="navIndex===2">
          
          <div class="download" v-if="false">
            <div class="topTips">
               <svg-icon icon-class="warn" class="icon"/>
              <span>
                温馨提示：私钥是您在区块链的身份标识，请注意保管！
              </span>
            </div>
            <el-button style="margin-top:20px">下载私钥</el-button>
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
  export default {
    data() {
      return {
        navIndex: 0,
      }
    },
    methods: {
      toggleNav(index) {
        this.navIndex = index
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

      .verifyWrap {
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
