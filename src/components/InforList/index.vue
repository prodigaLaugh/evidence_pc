<template>
  <el-row class="bottomBorder">
    <el-col :span=" rightText ? 12 : 24 " class="rightBorder">
      <p>{{ leftText }}</p>
    </el-col>
    <el-col :span="12" v-if="rightText">
      <p>{{ rightText }}</p>
    </el-col>
  </el-row>
</template>

<script>

export default {
  props: {
    leftText: {
      type: String,
      required: true
    },
    rightText: {
      type: String,
      default: ''
    }
  }

}
</script>
