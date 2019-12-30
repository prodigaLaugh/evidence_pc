<template>
  <div class="containerWrap buyPlanWrap">
    <div class="container">
      <div class="selectBoxWrap">
        <p class="title">请选择要扩展容量的类型</p>
        <el-radio v-model="type" label="01">存证</el-radio>
        <el-radio v-model="type" label="02">取证</el-radio>
      </div>

      <div class="selectBoxWrap">
        <p class="title">请选择扩展容量的次数</p>
        <el-radio v-model="times" label="10">10次</el-radio>
        <el-radio v-model="times" label="50">50次</el-radio>
        <el-radio v-model="times" label="100">100次</el-radio>
        <el-radio v-model="times" label="500">500次</el-radio>
        <el-radio v-model="times" label="1000">1000次</el-radio>
      </div>
      <div style="padding-bottom:30px;padding-top:20px;">
        <el-button
          :loading="loading"
          type="primary"
          size="large"
          @click="submit"
        > 确 定 </el-button>
        <el-button @click="$router.go(-1)">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import { addUsageTime } from '@/api/buyPlan.js'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'userInfo',
    ])
  },
  data(){
    return {
      type: '01',
      times: '10',
      loading: false,
    }
  },
  created(){
    var qureyType = this.$route.query.type
    const type = qureyType ? '0' + qureyType : '01'
    this.type = type

  },

  methods:{
    submit(){
      if( this.loading){
        return
      }
      var formdata = new FormData()
      formdata.append('email', this.userInfo.email)
      formdata.append('serviceType', this.type)
      formdata.append('serviceTime', this.times)

      this.loading = true
      addUsageTime(formdata)
        .then((data)=>{
          var tip = '', type = 'success'

          if(data.error_code === 200){
            tip = '扩展成功'

            setTimeout(()=>{
              this.$router.go(-1)
            }, 2000)

          }else{
            tip = data.error_msg
            type = 'error'
            this.loading = false
          }

          Message({
            message: tip,
            type: type,
            duration: 2000
          })

        })
        .catch(()=>{
          this.loading = false
        })
    }

  }
}
</script>

<style lang="scss">
  .buyPlanWrap{
    .container{
      .selectBoxWrap{
        padding-bottom:40px;
      }
      .title{
        padding-bottom:20px;
        color:#333;
        font-size:16px;
      }
    }
  }
</style>
