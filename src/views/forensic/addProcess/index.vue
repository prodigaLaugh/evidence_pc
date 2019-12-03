<template>
  <div class="containerWrap certAddWrap">
    <div class="container">

      <div class="topTips">
        <svg-icon icon-class="warn" class="icon" />
        <span>
          温馨提示：点击“开始”即开始过程取证，在取证过程中请不要关闭浏览器，否则会导致过程取证失败</router-link>
        </span>
      </div>

      <div class="formWrap">
        <el-form ref="form" :model="form" label-width="180px" label-position="left">

          <el-row style="padding-top:20px;border-bottom:1px solid #ddd;margin-bottom:30px;">
            <el-col :span="colLen">
               <el-form-item label="剩余使用次数" style="margin-bottom:10px;">
                 97次
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="区块链配置">
                 <el-input v-model="form.name"></el-input>
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="取证名称">
                 <el-input v-model="form.name"></el-input>
               </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="colLen">
               <el-form-item label="私钥签名">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">上传私钥</el-button>
                </el-upload>
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="colLen">
               <el-form-item label="">
                <el-button>开始</el-button>
                <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
               </el-form-item>
            </el-col>
          </el-row>

        </el-form>

      </div>


    </div>
  </div>
</template>

<script>


export default {

  data() {
    return {
      colLen:13,
      form:{
        name:'',
        fileList:[]
      }
    }
  },
  created() {

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>


<style lang="scss">
  .certAddWrap{
    .el-upload__tip{
      line-height:14px;
    }
    .el-form-item__label{
      padding-left:36px;
    }
  }


</style>
