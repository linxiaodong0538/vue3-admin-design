<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-16 09:57:26
 * @LastEditors: Lx
 * @LastEditTime: 2021-11-09 10:18:12
-->
<template>
  <div class="nav-page">
    <div class="header">
      <div class="left">
        <img src="../assets/image/logo.png" alt />
        <span class="name">商丘市智慧园林管理平台</span>
      </div>
      <div class="right">
        <img :src="avatar" alt class="user-avatar" />
        <span class="logout" @click="logout">退出</span>
      </div>
    </div>
    <div class="body">
      <div class="body__item" v-for="(item, index) in navs" @click="handleNav(item.path)">
        <div class="top">
          <div class="circle">
            <img :src="item.icon" alt />
          </div>
        </div>
        <div class="bottom">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { UserActionTypes } from '@/store/modules/user/action-types'
const router = useRouter()
const store = useStore()
const route = useRoute()
const navs = [
  {
    name: '园林一张图',
    path: '/visual',
    icon: require('../assets/nav-page/icon1.png')
  },
  {
    name: '园林城市评价系统',
    path: '/evaluate/gardenCity',
    icon: require('../assets/nav-page/icon2.png')
  },
  {
    name: '园林养护管理',
    path: '/conserve/greenbelt',
    icon: require('../assets/nav-page/icon3.png')
  },
  {
    name: '园林巡查管理',
    path: '/patrol/plan',
    icon: require('../assets/nav-page/icon4.png')
  },
  {
    name: '园林生态监测',
    path: '/monitor/air',
    icon: require('../assets/nav-page/icon5.png')
  },
  {
    name: '设施设备管理',
    path: '',
    icon: require('../assets/nav-page/icon6.png')
  },
  {
    name: '园林地理信息系统',
    path: '/geogSys/parkGreenbelt',
    icon: require('../assets/nav-page/icon7.png')
  },
  {
    name: '系统管理',
    path: '',
    icon: require('../assets/nav-page/icon8.png')
  }
]

const avatar = computed(() => {
  return store.state.user.userInfo.headImgUrl
})
const handleNav = path => {
  router.push(path)
}
const logout = () => {
  ElMessageBox.confirm('是否退出系统?', '提示', {
    confirmButtonText: '确定',
    type: 'warning'
  }).then(res => {
    console.log('res', res)
    useStore().dispatch(UserActionTypes.ACTION_LOGIN_OUT)
    router.push(`/login?redirect=${route.fullPath}`).catch(err => {
      console.warn(err)
    })
  })
}
</script>

<style lang="scss" scoped>
.nav-page {
  .header {
    height: 64px;
    line-height: 64px;
    align-items: center;
    background: #054e43;
    padding: 0 16%;
    color: #fff;

    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 22px;
      .name {
        padding-left: 6px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .logout {
        cursor: pointer;
        padding-left: 10px;
      }
    }
  }
  .body {
    background-image: url('../assets/image/home_img_bg.png');
    background-size: 100% 100%;
    height: calc(100vh - 64px);
    padding: 100px 16%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    &__item {
      cursor: pointer;
      margin-right: 40px;
      width: 270px;
      height: 320px;
      display: flex;
      align-items: center;
      flex-direction: column;

      background-image: url('../assets/nav-page/shape2.png');
      background-repeat: no-repeat;
      background-position: right bottom;
      background-size: 109px 109px;
      margin-bottom: 40px;
      &:nth-child(1) {
        background-color: #399587;
      }
      &:nth-child(2) {
        background-color: #62a8bd;
      }
      &:nth-child(3) {
        background-color: #3a8686;
      }
      &:nth-child(4) {
        background-color: #3e7ca2;
      }
      &:nth-child(5) {
        background-color: #79a8a9;
      }
      &:nth-child(6) {
        background-color: #79bd9a;
      }
      &:nth-child(7) {
        background-color: #62a8bd;
      }
      &:nth-child(8) {
        background-color: #379392;
      }
      .top {
        width: 100%;
        height: 216px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/nav-page/shape1.png');
        background-size: 100% 100%;
        .circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 104px;
          height: 104px;
          background: #fff;
          border-radius: 50%;
        }
      }
      .bottom {
        padding-top: 14px;
        font-size: 24px;
        color: #fff;
      }
    }
  }
}
</style>