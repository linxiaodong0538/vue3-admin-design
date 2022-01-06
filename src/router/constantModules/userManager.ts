
import { RouteRecordRaw } from 'vue-router'

const UserManagerRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
  },
  
]
export default UserManagerRouter
