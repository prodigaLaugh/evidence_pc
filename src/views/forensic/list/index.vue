<template>
  <div class="containerWrap forensicWrap">
    <div class="container">


      <div class="containerFilterWrap">
        <div>
          <!-- <el-button type="primary" @click.native.prevent="$router.push('/forensic/add')" >+ 网页取证</el-button> -->
          <el-button
            type="primary"
            @click.native.prevent="addEvidence"
          >+ 过程取证</el-button>
        </div>

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
          <el-table-column align="center" label="取证号" width="170">
            <template slot-scope="scope">
              {{ scope.row.access_number }}
            </template>
          </el-table-column>

          <el-table-column label="取证名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.access_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="取证状态" width="110" align="center">
            <template slot-scope="scope">
              {{ '取证成功'}}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="创建时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.access_date }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="取证类型" width="200">
            <template slot-scope="scope">
              {{ scope.row.func_type | getFuncTypeText }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
               <div class="operBtnWrap">
                 <span  @click="$router.push({path:'/forensic/detail', query: {accessNumber: scope.row.access_number} })">详情</span>
                 <span class="line"></span>
                 <!-- <span>分享</span>
                 <span class="line"></span> -->
                 <!-- <span>查看确认函</span> -->
                  <a :href="`http://192.168.2.4:9008?accessNumber=${scope.row.access_number}&email=${userInfo.email}&fileType=`" target="_blank">查看确认函</a>
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
import { MessageBox, Message } from 'element-ui'
import { mapGetters } from 'vuex'
import { queryEvidenceList } from '@/api/depositCertificate'
import { getFuncTypeText } from '@/utils/index'

export default {
  computed: {
    ...mapGetters([
      'userInfo',
      'verifyStatus',
    ])
  },
  filters: {
    getFuncTypeText
  },
  data() {
    return {
      params:{
        offset: 0,
        limit: 20,
        funcType:['01', '02', '03', '04', '07'],
      },
      executeChainStartDate: '',
      executeChainEndDate: '',
      time: '',
      searchType: 'accessNumber',
      options: [{
        value: 'accessNumber',
        label: '取证号'
      }, {
        value: 'accessName',
        label: '取证名称'
      }, {
        value: 'funcType',
        label: '取证类型'
      }],

      searchText: '',

      list: [],
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.getList()
    this.usageInfo = JSON.parse( localStorage.usageInfo ? localStorage.usageInfo : "{}" )
  },
  methods: {
    addEvidence(){
      if(this.verifyStatus === '00'){
        Message({
          message: '请进入账户管理，完成认证！',
          type: 'error',
          duration: 2000
        })
        return;
      }
      if(this.usageInfo.obtain_evidence_balance_number <= 0){
        Message({
          message: '请扩展取证容量！',
          type: 'error',
          duration: 2000
        })
        return;
      }
      this.$router.push('/forensic/addProcess')
    },
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

      formdata.append('email', this.userInfo.email)
      formdata.append('offset', newOffset)
      formdata.append('limit', limit)


      var searchText = this.searchText.trim()
      if(!searchText || searchText && this.searchType !== 'funcType'){
        formdata.append('funcType', funcType.join('&'))
      }

      if(searchText){
        if(this.searchType === 'funcType'){
          var textJson = {
            '录音取证': "01",
            '录像取证': "02",
            '拍照取证': "03",
            '录屏取证': "04",
            '文件存证': "05",
            '内容存证': "06",
            '网页取证': "07",
            '过程取证': "08"
          }
          var text = textJson[searchText];

          formdata.append('funcType', text)
        }else{
          formdata.append(this.searchType, searchText)
        }

      }


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
  .forensicWrap{

    .containerFilterWrap{
      margin-top:0;
    }


  }
</style>
