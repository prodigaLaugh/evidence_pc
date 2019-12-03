<template>
  <div class="containerWrap forensicWrap">
    <div class="container">


      <div class="containerFilterWrap">
        <div>
          <el-button type="primary" @click.native.prevent="$router.push('/forensic/add')" >+ 网页取证</el-button>
          <el-button type="primary" @click.native.prevent="$router.push('/forensic/addProcess')">+ 过程取证</el-button>
        </div>

        <div class="filterWrap">

          <div class="timeWrap">
            <span>上链时间</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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

        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="存证号" width="95">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>

          <el-table-column label="存证名称" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="共享对象" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="上链时间" width="110" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="存证来源" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <div class="operBtnWrap">
              <span @click="$router.push('/forensic/detail')">详情</span>
              <span class="line"></span>
              <span>分享</span>
              <span class="line"></span>
              <span>更多</span>
            </div>
          </el-table-column>
        </el-table>
      </div>


    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
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
