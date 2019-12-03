<template>
  <div class="containerWrap forensicWrap">
    <div class="container">


      <div class="containerFilterWrap">
        <div>
          <el-button type="primary" @click.native.prevent="$router.push('/forensic/add')" >+ 新增应用</el-button>

        </div>

        <div class="filterWrap">

          <div class="timeWrap">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="typeWrap">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="input" placeholder="请输入内容"></el-input>

            <el-button  type="primary">搜索</el-button>
          </div>
        </div>
      </div>

      <div class="containerListsWrap">


      </div>


    </div>
  </div>
</template>

<script>

export default {
  filters: {

  },
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
      list: null,
      listLoading: true
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
