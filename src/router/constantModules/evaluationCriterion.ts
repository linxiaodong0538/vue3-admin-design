/*
 * @Author: XNY
 * @Date: 2021-09-22 13:32:49
 * @LastEditTime: 2021-10-12 10:28:55
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\router\constantModules\evaluationCriterion.ts
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
const evaluationCriterionRouter: Array<RouteRecordRaw> = [
  {
    path: '/gardenCity',
    component: Layout,
    // redirect: 'evaluate/standard',
    // name:'评价标准管理',
    children: [
      {
        path: '/score',
        component: () => import(/* webpackChunkName: "evaluate-standard-add" */ '@/views/evaluate/gardenCity/score.vue'),
        name: '评分',
        meta: {
          title: 'add',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/standard',
    component: Layout,
    // redirect: 'evaluate/standard',
    // name:'评价标准管理',
    children: [
      {
        path: '/add',
        component: () => import(/* webpackChunkName: "evaluate-standard-add" */ '@/views/evaluate/standard/add.vue'),
        name: '评价标准管理新增',
        meta: {
          title: 'add',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/conserve',
    component: Layout,
    // redirect: 'evaluate/maintenanceRecord', views\conserve\maintenanceRecord\index.vue
    // name:'评价标准管理',
    children: [
      {
        path: '/maintenanceRecord',
        component: () => import(/* webpackChunkName: "conserve-maintenanceRecord" */ '@/views/conserve/maintenanceRecord/index.vue'),
        name: '养护记录',
        meta: {
          title: '养护记录',
          noCache: true
        }
      }
    ]
  },
  
]

export default evaluationCriterionRouter
