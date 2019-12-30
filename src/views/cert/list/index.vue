<template>
  <div class="containerWrap">
    <div class="container">


      <!-- <div class="topTips">
         <svg-icon icon-class="warn" class="icon"/>

        <span>
          温馨提示：存证中心只提供通过飞洛印平台上传的存证信息，通过SDK接入的存证信息请在<router-link to="/application/index">「应用中心」</router-link>查看
        </span>
      </div> -->

      <div class="containerFilterWrap">
        <el-button type="primary" @click.native.prevent="$router.push('/cert/add')">+ 新增存证</el-button>
        <div class="filterWrap">

          <div class="timeWrap">
            <span>上链时间</span>
            <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <div class="typeWrap">
            <el-select v-model="searchType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="searchText" placeholder="请输入内容"></el-input>

            <el-button  type="primary" @click="loadData(1)">搜索</el-button>
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
          <el-table-column align="center" label="存证号" width="166">
            <template slot-scope="scope">
              {{ scope.row.access_number }}
            </template>
          </el-table-column>

          <el-table-column label="存证名称"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.access_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="共享对象" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.share_target || '--' }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="上链时间" width="160" align="center">
            <template slot-scope="scope">
              {{scope.row.access_date}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="存证来源" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.asscess_source || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
             <div class="operBtnWrap">
               <span  @click="$router.push({path:'/cert/detail', query: {accessNumber: scope.row.access_number} })">详情</span>
               <span class="line"></span>
               <!-- <span>分享</span>
               <span class="line"></span> -->
               <span>查看确认函</span>
             </div>
            </template>

          </el-table-column>
        </el-table>

        <div class="paginationWrap" v-if="total">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="loadData"
            :total="total">
          </el-pagination>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryEvidenceList } from '@/api/depositCertificate'

export default {
  computed: {
    ...mapGetters([
      'userInfo',
    ])
  },
  data() {
    return {
      params:{
        offset: 0,
        limit: 20,
        funcType:['05', '06'],
      },
      executeChainStartDate: '',
      executeChainEndDate: '',
      time: '',
      searchType: 'accessNumber',
      options: [{
        value: 'accessNumber',
        label: '存证号'
      }, {
        value: 'accessName',
        label: '存证名称'
      }, {
        value: 'shareTarget',
        label: '共享对象'
      }, {
        value: 'asscessSource',
        label: '存证来源'
      }],

      searchText: '',

      list: [],
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    loadData( num ){
      var num = num || 1
      this.params.offset = num -1;
      this.getList()
    },
    getParams(){
      const { offset, limit, funcType } = this.params
      var newOffset = offset * limit
      var formdata = new FormData()

      if(this.time){
        var executeChainStartDate = this.time[0]
        var executeChainEndDate = this.time[1];
        formdata.append('executeChainStartDate', executeChainStartDate)
        formdata.append('executeChainEndDate', executeChainEndDate)
      }
      var searchText = this.searchText.trim()
      if(searchText){
        formdata.append(this.searchType, searchText)
      }
      formdata.append('email', this.userInfo.email)
      formdata.append('offset', newOffset)
      formdata.append('limit', limit)
      formdata.append('funcType', funcType.join('&'))
      return formdata;
    },
    getList(){

      var formdata = this.getParams()
      this.listLoading = true

      queryEvidenceList(formdata)
        .then((data)=>{
          if(data.error_code === 200 && data.rows){
            const list = data.rows
            this.list.splice(0, 999, ...list)
            this.total = data.total
          }else{
            this.list.splice(0,999)
          }
          this.listLoading = false
        })
        .catch(()=>{
          this.list.splice(0,999)
          this.listLoading = false
        })
    },

  }
}
</script>

<style lang="scss">

  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right:0;
  }

</style>
