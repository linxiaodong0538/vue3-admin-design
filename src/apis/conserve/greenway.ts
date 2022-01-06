/*
 * @Author: XNY
 * @Date: 2021-09-28 15:06:36
 * @LastEditTime: 2021-09-29 15:39:02
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\apis\conserve\greenway.ts
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from './../../model/rootObject'

/** 列表 */
export const getList = (data?: any) => {
  return https().request<RootData<any>>(`/api-ecocity/v1/curing/green-lane`,Method.GET,data,ContentType.form)
}
/** 保存 */
export const greenWayCreate = (data?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/curing/green-lane`,Method.POST,data,ContentType.json)
}
/** 修改 */
export const greenWayUpdate = (data?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/curing/green-lane`,Method.PUT,data,ContentType.json)
}
/** 删除 */
export const greenWayRemove = (ids?: any) => {
  return https().request(`/api-ecocity/v1/curing/green-lane/batch?${ids}`,Method.DELETE,undefined,ContentType.form)
}
/** 详情 /api-ecocity/v1/curing/green-lane/{id} */
export const greenWayGet = (id?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/curing/green-lane/${id}`,Method.GET,undefined,ContentType.form)
}
/** 所有  */
export const greenWayAll = (data?: any) => {
  return https().request<RootData<any>>(`/api-ecocity/v1/curing/green-lane/all`, Method.GET, data, ContentType.json)
}