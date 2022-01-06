<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-09-16 14:51:53
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-16 14:57:27
-->
<template>
  <div class="basic-container">
    <el-card class="basic-card">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'basicContainer'
}
</script>

<style lang="scss">

.basic-container {
  height: calc(100vh - 84px);
  overflow: auto;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0;
  .basic-card {
    min-height: calc(100% - 32px);
    margin: 16px;
  }
}
</style>
