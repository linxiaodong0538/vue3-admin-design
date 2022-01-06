<!--
 * @Author: your name
 * @Date: 2021-09-22 15:17:45
 * @LastEditTime: 2021-09-30 16:36:53
 * @LastEditors: Lw
 * @Description: In User Settings Edit
 * @FilePath: \scs-ecocity-web\src\views\visual\header.vue
-->
<template>
  <div class="header">
    <strong class="title">商丘市智慧园林指挥调度中心</strong>
    <!-- <span class="time" :title="time">{{ time }}</span> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 实时时间展示
// let time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
// setInterval(() => {
//   time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
// }, 1000)
</script>

<style lang="scss" scoped>
.header {
  background-image: url("../../assets/image/img_title_big.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #bdffee;
  width: calc(100% - 50px);
  height: 70px;
  margin: 0 25px;
  .title {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.375em;
  }
  .btn {
    cursor: pointer;
    float: left;
    color: #bdffee;
    padding: 2vh 1.5vw 2.25vh 1vw;
    max-width: 8vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .icon {
      float: left;
      height: 24px;
      width: 40px;
      position: relative;
      transform: translate(0, -10%);
      margin-right: 10px;
    }
  }
  .time {
    float: right;
    color: #bdffee;
    padding: 2vh 1vw 2.25vh 1.5vw;
    max-width: 8vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
