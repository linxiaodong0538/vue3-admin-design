<!--
 * @Author: your name
 * @Date: 2021-09-22 15:01:17
 * @LastEditTime: 2021-09-22 16:24:10
 * @LastEditors: Lx
 * @Description: In User Settings Edit
 * @FilePath: \scs-ecocity-web\src\views\visual\f.vue
-->
<template>
  <div class="content">
    <div v-if="title" class="title">
      <img :src="require('@/assets/image/img_title_small@2x.png')" class="title-back" />
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.content {
  background-color: rgba(5, 90, 84, 0.5);
  backdrop-filter: blur(10px);
  padding: 16px;
  .title {
    height: 46px;
    line-height: 38px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    .title-back {
      position: fixed;
      height: 38px;
    }
  }
}
</style>
