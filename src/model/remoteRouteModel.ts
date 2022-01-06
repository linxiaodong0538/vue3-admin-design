/*
 * @Description:
 * @Author: ZY
 * @Date: 2021-02-02 11:58:52
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-02 19:53:33
 */
import { Component } from '@/@types/types'
export interface Meta {
  title: string
  icon: string
}

export interface Children {
  id: number
  parentId: number
  path: string
  component: string
  name: string
  source: string
  children: any[]
}

export interface RemoteRoute {
  id: number
  parentId: number
  path: string
  component: string | Component
  name: string
  source: string
  children: Children[]
}

export interface TopMenu {
  id: string
  name: string
}
