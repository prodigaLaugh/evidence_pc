<template>
  <div class="containerWrap forensicWrap">
    <div class="container">


      <div class="containerFilterWrap">
        <div>
          <el-button type="primary" @click.native.prevent="$router.push('/forensic/add')" >+ 新建订单</el-button>
          <el-button type="primary" @click.native.prevent="$router.push('/forensic/addProcess')">+ 我要开票</el-button>
        </div>

        <div class="filterWrap">

        </div>

      </div>


    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      value1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss">

  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right:0;
  }
  .forensicWrap{

    .containerFilterWrap{
      margin-top:0;
    }


  }
</style>
