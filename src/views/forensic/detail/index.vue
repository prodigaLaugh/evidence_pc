<template>
  <div class="containerWrap forensicDetail">
    <div class="container">
      <div class="topBtnWrap">
        <el-button>取证校验</el-button>
        <el-button>申请公证</el-button>
        <el-button>证据包下载</el-button>
      </div>

      <div class="cerInfoWrap">

        <div class="cerInfoListWrap">
          <div class="title">取证信息</div>
          <Detail :leftText="'取证号：129918293293'" :rightText="'取证名称：ddd'" />
          <Detail :leftText="'取证类型：录音取证'" :rightText="'取证时间：2019-2-3'" />
          <Detail :leftText="'取证状态：取证成功'" :rightText="'经纬度：北纬N98′38″'" />
          <Detail :leftText="'uuid：dfdf'" :rightText="'确认函：立即查看'" />
        </div>

        <div class="cerInfoListWrap">
          <div class="title">区块链信息</div>
          <Detail :leftText="'上链时间：2019-11-25 16:52:15'" :rightText="'所属区块链：印刻链'" />
          <Detail :leftText="'取证Hash：5cbc7037c0fa61fb3ba9d6479fef0cbd'" :rightText="'交易Hash：0x94a2c190da08ba02abb1c5e7ebab6a2'" />
        </div>

        <div class="cerInfoListWrap">
          <div class="title">公证信息</div>
          <Detail :leftText="'公证服务提供方：杭州互联网公证处'" :rightText="'公证申请时间：2019-11-25 17:14:40'" />
          <Detail :leftText="'预估费用：￥600.00~1200.00'"  />
        </div>

      </div>

    </div>
  </div>
</template>


<script>
  import Detail from '@/components/InforList/index.vue'
  export default {
    components: {
      Detail
    },

    data() {
      return {
        colLen: 13,
        form: {
          name: '',
          fileList: []
        }
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>


<style lang="scss">
  .forensicDetail {

  }
</style>
