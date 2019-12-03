<template>
  <div class="containerWrap forensicAddWrap">
    <div class="container">

      <div class="topTips">
        <svg-icon icon-class="warn" class="icon" />
        <span>
          温馨提示：网页抓取需要一定时间，请在提交成功后耐心等待！</router-link>
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

          <div class="addForensicTitle">
            基本设置 <span> *</span>
          </div>

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
              <el-form-item label="取证地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="colLen">
              <el-form-item label="私钥签名">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                  :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">上传私钥</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="addForensicTitle">
            高级设置 <span> *</span>
          </div>

          <div class="foldingListsWrap">

            <div class="foldingListWrap">
              <div
                @click="foldFlag[0]=!foldFlag[0]"
                :class="['foldingListTopWrap', foldFlag[0] ? 'active' : '']">
                <span>
                  <i :class=" foldFlag[0]? 'el-icon-caret-bottom' : 'el-icon-caret-right'  "></i>
                  浏览器设置
                </span>
                <p>PC端 Chrome浏览器 1920*1080</p>
              </div>

              <div v-show="foldFlag[0]" class="foldingListBottomWrap">
                <div class="radioWrap">
                  <el-radio v-model="radio" label="1">PC浏览器</el-radio>
                  <el-radio v-model="radio" label="2">移动端浏览器</el-radio>
                </div>

                <div class="selectWrap">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>


            <div class="foldingListWrap">
              <div
                @click="foldFlag[1]=!foldFlag[1]"
                :class="['foldingListTopWrap', foldFlag[1] ? 'active' : '']">
                <span>
                  <i :class=" foldFlag[1]? 'el-icon-caret-bottom' : 'el-icon-caret-right'  "></i>
                  定时取证
                </span>
                <p>不开启</p>
              </div>

              <div v-show="foldFlag[1]" class="foldingListBottomWrap">
                <div class="radioWrap">
                  <el-radio v-model="radio" label="1">开启</el-radio>
                  <el-radio v-model="radio" label="2">不开启</el-radio>
                </div>
              </div>
            </div>

            <div class="foldingListWrap">
              <div
                @click="foldFlag[2]=!foldFlag[2]"
                :class="['foldingListTopWrap', foldFlag[2] ? 'active' : '']">
                <span>
                  <i :class=" foldFlag[2]? 'el-icon-caret-bottom' : 'el-icon-caret-right'  "></i>
                  代理取证
                </span>
                <p>不开启</p>
              </div>

              <div v-show="foldFlag[2]" class="foldingListBottomWrap">
                <div class="radioWrap">
                  <el-radio v-model="radio" label="1">开启</el-radio>
                  <el-radio v-model="radio" label="2">不开启</el-radio>
                </div>
              </div>
            </div>

            <div class="foldingListWrap">
              <div
                @click="foldFlag[3]=!foldFlag[3]"
                :class="['foldingListTopWrap', foldFlag[3] ? 'active' : '']">
                <span>
                  <i :class=" foldFlag[3]? 'el-icon-caret-bottom' : 'el-icon-caret-right'  "></i>
                  广告位点击
                </span>
                <p>不开启</p>
              </div>

              <div v-show="foldFlag[3]" class="foldingListBottomWrap">
                <div class="radioWrap">
                  <el-radio v-model="radio" label="1">开启</el-radio>
                  <el-radio v-model="radio" label="2">不开启</el-radio>
                </div>
              </div>
            </div>


          </div>



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
        colLen: 13,
        form: {
          name: '',
        },
        fileList: [],

        foldFlag: {
          0: false,
          1: false,
          2: false,
          3: false
        },

        radio: 1,
        options: [
          {
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
          }
         ],
        value: ''
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
  $color_blue:#2d7feb;


  .forensicAddWrap {
    .color_blue{
      color:$color_blue
    }

    .el-upload__tip {
      line-height: 14px;
    }

    .el-form-item__label {
      padding-left: 36px;
    }
    .foldingListsWrap{
      padding-bottom:10px;
    }
    
    .foldingListWrap{
      padding-left:20px;
      .foldingListTopWrap{
        position: relative;
        padding: 12px 16px;
        padding-left: 20px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
        cursor: pointer;
        transition: all 0.3s;
        display:flex;
        align-items: center;
        &.active{
          border-bottom:1px solid $color_blue;
        }
        >span{
          width:140px;
        }
        p{
          color:#999;
        }
      }

      .foldingListBottomWrap{
        padding:16px 16px 16px 20px;
        .radioWrap{
          padding:12px 0;
        }
      }

    }
  }
</style>
