/*
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-16 09:57:26
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-23 15:38:16
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.gif' {

}

declare module 'mockjs'

declare module 'js-cookie'