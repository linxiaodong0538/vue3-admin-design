/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-07-16 10:35:17
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-14 11:05:42
 */

import { createRouter, createWebHashHistory, RouteRecordRaw,createWebHistory } from 'vue-router'
import Layout from '@/layout/Index.vue'

const constantFiles = require.context('./constantModules', true, /\.ts$/)

let constantModules: Array<RouteRecordRaw> = []
constantFiles.keys().forEach(key => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles(key).default)
})

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/Index.vue')
      }
    ]
  },
  {
    path: '/navPage',
    component:() => import(/* webpackChunkName: "dashboard" */ '@/views/nav.vue'),
    name: '首页'
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/evaluate/gardenCity/index.vue'),
        name: '园林城市自评',
        meta: {
          title: '园林城市自评',
          icon: '#icondashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/visual',
    component: () => import(/* webpackChunkName: "visual" */ '@/views/visual/index.vue'),
    alias: '/s'
  },
  ...constantModules
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
