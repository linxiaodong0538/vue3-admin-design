/*
 * @Description: 粘贴板
 * @Author: scy
 * @Date: 2021-01-21 20:13:03
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-08 16:52:25
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ProfileRouter: Array<RouteRecordRaw> = [
  {
    path: '/clipboard',
    component: Layout,
    redirect: '/noredirect',
    children: [
      {
        path: '/index',
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/Index.vue'),
        name: 'Clipboard',
        meta: {
          title: 'clipboard',
          icon: '#iconcopy'
        }
      }
    ]
  }
]

export default ProfileRouter
