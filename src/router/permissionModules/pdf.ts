/*
 * @Description: pdf打印
 * @Author: scy
 * @Date: 2021-01-21 20:13:03
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-08 16:51:09
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const PdfRouter: Array<RouteRecordRaw> = [
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: '/index',
        component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/Index.vue'),
        name: 'PDF',
        meta: {
          title: 'pdf',
          icon: '#iconPDF'
        }
      }
    ]
  },
  {
    path: '/pdf-download-example',
    component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/Download.vue'),
    meta: { hidden: true }
  }
]

export default PdfRouter
