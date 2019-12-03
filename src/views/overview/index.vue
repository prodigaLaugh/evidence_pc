<template>
  <div class="dashboard-container">
    <el-row class="personInfoWrap">
      <el-col span="12" class="personWrap">
        <div class="imageWrap">
          <img src="../../assets/overview/avatar.png" alt="" class="image">
        </div>
        <div class="person">
          <div class="nameWrap">
            <span>Hi，flNNur2Q</span>
            <span>企业认证</span>
          </div>
          <div class="time">今天是11月27日，周三，欢迎回到飞洛印~</div>
        </div>
      </el-col>

      <el-col span="12">
        <div class="gzWrap">
          <div>3</div>
          <div>当前申请公证</div>
        </div>
      </el-col>
    </el-row>

    <el-row class="centerWrap" :gutter="20">
      <el-col span="12">
        <div class="pieOuterWrap">
          <div class="titleWrap">
            <div>存证使用情况</div>
            <div>
              <el-button style="color:#2d7feb" size="small">新增存证</el-button>
              <el-button type="primary" size="small">扩展容量</el-button>
            </div>
          </div>
          <div class="pieWrap">
            <div id="pie" >

            </div>
            <ul>
              <li>
                <span>文件存证</span>
                <span>2条</span>
              </li>
              <li>
                <span>内容存证</span>
                <span>2条</span>
              </li>
              <li>
                <span>应用存证</span>
                <span>2条</span>
              </li>
              <li>
                <span>存证余量</span>
                <span>2条</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>

      <el-col span="12">
        <div class="pieOuterWrap">
          <div class="titleWrap">
            <div>取证使用情况</div>
            <div>
              <el-button style="color:#2d7feb" size="small">新增取证</el-button>
              <el-button type="primary" size="small">扩展容量</el-button>
            </div>
          </div>
          <div class="pieWrap">
            <div id="main" >

            </div>
            <ul>
              <li>
                <span>文件存证</span>
                <span>2条</span>
              </li>
              <li>
                <span>内容存证</span>
                <span>2条</span>
              </li>
              <li>
                <span>应用存证</span>
                <span>2条</span>
              </li>
              <li>
                <span>存证余量</span>
                <span>2条</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>

    </el-row>

    <el-row>
      <el-col>
        <div class="applycationWrap">
          <div class="title">应用中心</div>
          <div class="centerWrap">
            <div class="topWrap">
              <svg-icon icon-class="overviewIcon" class="icon"/>
              <div>
                <div class="itemWrap">
                  <span>当前接入应用</span>
                  <div>0</div>
                </div>
                <div class="line"></div>
                <div class="itemWrap">
                  <span>正常运行应用</span>
                  <div>0</div>
                </div>
              </div>

            </div>

            <el-button  style="color:#2D7FEB">+ 新建应用</el-button>
          </div>

          <div class="barWrap">
            <el-progress :percentage="50"></el-progress>
            <div>
              <div>
                <span style="background:#03BC7E"></span>
                <span>正常运行应用</span>
              </div>
              <div>
                <span  style="background:#2D7FEB"></span>
                <span>当前接入应用</span>
              </div>
              <div>
                <span  style="background:#D6DCE4"></span>
                <span>未接入</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created(){
    this.$nextTick(()=>{
      var echarts = require('echarts');

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('pie'));
      const options  = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },

          series: [
            {
                name:'存证使用情况',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'文件存证'},
                    {value:310, name:'内容存证'},
                    {value:234, name:'应用存证'},
                    {value:135, name:'存证余量'},
                ]
            }
        ]

      };
      // 绘制图表
      myChart.setOption(options);
    })

  }
}
</script>

<style lang="scss" scoped>
  $bg:#fff;
  $blue:#2D7FEB;
  $shadow:0px 2px 4px 0px #e7ebf0;

.dashboard {
  &-container {
    padding:20px;
    background:#F5F6F7;


    .personInfoWrap{
      box-shadow: $shadow;
      background:$bg;
      .personWrap{
        display:flex;
        align-items: center;
        padding:40px;
        .imageWrap{
          width:80px;
          height:80px;
          display:flex;
          justify-content: center;
          align-items: center;
          img{
            width:80px;
            height:80px;
          }
        }

        .person{
          padding-left:20px;
          height:80px;
          display:flex;
          flex-direction: column;
          justify-content: center;
          .nameWrap{
            display:flex;
            align-items: center;
            >span:nth-of-type(1){
              font-size:24px;
              color:#333;
            }
            >span:nth-of-type(2){
              margin-left:10px;
              font-size:14px;
              color:rgb(37, 171, 76)
            }
          }
          .time{
            color:#666;
            padding-top:14px;
          }
        }
      }

      .gzWrap{
        display:flex;
        height:160px;
        padding-left:48px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        position:relative;
        &:before{
          content:'';
          position:absolute;
          left:0;
          top:50%;
          transform: translate(0,-50%);
          height:80px;
          border-left:2px solid #ddd;
        }
        >div:nth-of-type(1){
          font-size:48px;
          line-height:67px;
          color:#333;
        }
        >div:nth-of-type(2){
          color:#666;
        }
      }
    }


    .centerWrap{
      margin-top:20px;
      .pieOuterWrap{
        box-shadow: $shadow;
        background:#fff;
        padding:16px 20px;
        .titleWrap{
          display:flex;
          justify-content: space-between;
          align-items: center;
          >div:nth-of-type(1){
            font-weight:500;
            color:#333;
          }
        }
      }
      .pieWrap{
        display:flex;
        align-items: center;
        >div{
          width:402px;
          height:263px;
        }
        >ul{
          padding-left:20px;
          li{
            color:#333;
            margin-bottom:10px;
            >span:nth-of-type(2){
              color:$blue;
              padding-left:4px;
            }
          }
        }
      }
    }


    .applycationWrap{
        background: #fff;
        box-shadow: $shadow;
        margin-top: 16px;
        padding: 20px;
        .title{
          margin-bottom: 20px;
          font-weight:bold;
          color:#333;
        }

        .centerWrap{
          display:flex;
          justify-content: space-between;
          margin-bottom: 16px;
          align-items: center;
          .topWrap{
            display:flex;
            .icon{
              width: 30px;
              height: 30px;
              margin-right: 8px;
            }
            >div{
              display:flex;
              .itemWrap{
                width:180px;
                >span{
                  font-size: 16px;
                  font-weight: 400;
                  color: #666;
                  line-height: 30px;
                }
                >div{
                  font-size: 28px;
                  font-weight: 400;
                  color: #333;
                  line-height: 40px;
                  margin-top: 9px;
                }
              }
              .line{
                  width: 1px;
                  height: 18px;
                  background-color: #E7EBF0;
                  margin-right: 24px;
                  margin-top: 30px;
              }
            }
          }
        }

        .barWrap{
          padding-left: 38px;
          padding-right: 176px;
          >div:nth-of-type(2){
            display: flex;
            padding: 0;
            margin: 0;
            margin-top: 18px;
            margin-bottom: 8px;
            list-style: none;
            justify-content: center;
            >div{
              margin-right: 28px;
              font-size: 12px;
              font-weight: 400;
              color: #333;
              line-height: 17px;
              >span:nth-of-type(1){
                display: inline-block;
                width: 7px;
                height: 7px;
                margin-right: 12px;
                line-height: 17px;
              }
              >span:nth-of-type(2){

              }
            }
          }
        }

    }

  }




}
</style>
