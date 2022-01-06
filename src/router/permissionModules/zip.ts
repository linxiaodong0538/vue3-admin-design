/*
 * @Author: Lw
 * @Date: 2021-09-17 10:28:36
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-08 16:50:13
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ZipeRouter: Array<RouteRecordRaw> = [
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    meta: {
      title: 'zip',
      icon: '#iconzip',
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: '/download',
        component: () => import(/* webpackChunkName: "zip" */ '@/views/zip/Index.vue'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  }
]
export default ZipeRouter
