/*
 * @Author: Lw
 * @Date: 2021-09-24 15:23:14
 * @LastEditTime: 2021-09-26 14:55:50
 * @LastEditors: Lw
 * @Description: In User Settings Edit
 * @FilePath: \scs-ecocity-web\src\apis\patrol\staff.ts
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from '../model/rootObject'

export const getList = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/system/staff',
    Method.GET,
    data,
    ContentType.form
  )
}
export const getAll = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/system/staff/all',
    Method.GET,
    data,
    ContentType.form
  )
}

export const add = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/system/staff',
    Method.POST,
    data,
    ContentType.json
  )
}

export const edit = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/system/staff',
    Method.PUT,
    data,
    ContentType.json
  )
}

export const remove = (id?: string) => {
  return https().request<RootObject<any>>(
    `/api-ecocity/v1/system/staff/${id}`,
    Method.DELETE,
    undefined,
    ContentType.json
  )
}
