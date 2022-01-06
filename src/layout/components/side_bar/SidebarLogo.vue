<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-16 10:39:50
 * @LastEditors: Lx
 * @LastEditTime: 2021-11-09 10:41:18
-->
<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="false" key="collapse" class="sidebar-logo-link" to="">
        <img src="favicon.ico" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/navPage">
        <img src="../../../assets/image/logo.png" class="sidebar-logo" />
        <h1 :class="sidebar.opened ? 'sidebar-title' : ''">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import settings from '@/config/default/setting.config'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const store = useStore()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const title = settings.title
    return {
      title,
      sidebar
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: $menuBg;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 24px;
      height: 22px;
      vertical-align: middle;
      margin-right: 0px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 6px;
    }
  }
}
</style>
