<template>
  <div class="containerWrap forensicDetail">
    <div class="container">
      <div class="topBtnWrap">
        <!-- <el-button>取证校验</el-button>
        <el-button>申请公证</el-button>
        <el-button>证据包下载</el-button> -->
      </div>

      <div class="cerInfoWrap">

        <div class="cerInfoListWrap">
          <div class="title">取证信息</div>
          <Detail
            :leftText="'取证号：'+ info.accessNumber "
            :rightText="'取证名称：'+ info.accessName"
          />
          <Detail
            :leftText="'取证类型：'+  getFuncTypeText(info.funcType)"
            :rightText="'取证时间：'+ info.accessDate"
          />
          <Detail
            :leftText="'取证状态：取证成功'"
            :rightText="'经纬度：'+ info.longitudeAndLatitude.replace(/&&/g,' ')"
          />
         <el-row class="bottomBorder">
           <el-col :span="12" class="rightBorder">
             <p>uuid：{{ info.uuid || '--'}}</p>
           </el-col>
           <el-col :span="12">
             <p>确认函： <a :href="`http://192.168.2.4:9008?accessNumber=${info.accessNumber}&email=${userInfo.email}&fileType=`" target="_blank" style="color:#2D7FEB;cursor:pointer;">立即查看</a>
             </p>
           </el-col>
         </el-row>
        </div>

        <div class="cerInfoListWrap">
          <div class="title">区块链信息</div>
          <Detail
            :leftText="'上链时间：2019-11-25 '+ info.Blcok.blcokDate"
            :rightText="'所属区块链：'+ info.Blcok.blockChainName"
          />
          <Detail
            :leftText="'取证Hash：'+ info.Blcok.blockHash"
            :rightText="'交易Hash：'+ info.Blcok.transactionHash"
          />
        </div>

        <!-- <div class="cerInfoListWrap">
          <div class="title">公证信息</div>
          <Detail :leftText="'公证服务提供方：杭州互联网公证处'" :rightText="'公证申请时间：2019-11-25 17:14:40'" />
          <Detail :leftText="'预估费用：￥600.00~1200.00'"  />
        </div>
 -->
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Detail from '@/components/InforList/index.vue'
  import { queryEvidenceDetail } from '@/api/depositCertificate.js'
  import { getFuncTypeText } from '@/utils/index.js'
  export default {
    components: {
      Detail
    },
    computed: {
      ...mapGetters([
        'userInfo',
      ])
    },
    data() {
      return {
        colLen: 13,
        form: {
          name: '',
          fileList: []
        },
        listLoading: true,
        info: {}
      }
    },
    created() {
      this.getInfo()
    },

    methods: {
      getFuncTypeText(val){
        return getFuncTypeText(val)
      },
      getInfo(){
        var formdata = new FormData()
        const accessNumber = this.$route.query.accessNumber;
        formdata.append('email', this.userInfo.email)
        formdata.append('accessNumber', accessNumber)

        queryEvidenceDetail(formdata)
          .then((data)=>{
            if(data.error_code === 200){
              this.info = data.data;
            }
            this.listLoading = false;
          })
          .catch(()=>{
            this.listLoading = false;
          })
      }
    }
  }
</script>


<style lang="scss">
  .forensicDetail {

  }
</style>
