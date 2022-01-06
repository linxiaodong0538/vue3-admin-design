/*
 * @Author: XNY
 * @Date: 2021-09-30 11:20:25
 * @LastEditTime: 2021-10-12 13:54:52
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\apis\conserve\groupStaff.ts
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from './../../model/rootObject'

/** 列表 */
export const getList = (data?: any) => {
  return https().request<RootData<any>>(`/api-ecocity/v1/curing/group-staff`,Method.GET,data,ContentType.form)
}
/** 保存 */
export const create = (data?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/curing/group-staff`,Method.POST,data,ContentType.json)
}
/** 修改 */
export const update = (data?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/curing/group-staff`,Method.PUT,data,ContentType.json)
}
/** 删除 */
export const remove = (ids?: any) => {
  return https().request(`/api-ecocity/v1/curing/group-staff/batch?${ids}`,Method.DELETE,undefined,ContentType.form)
}
/** 详情 /api-ecocity/v1/curing/group-staff/{id} */
export const get = (id?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/curing/group-staff/${id}`,Method.GET,undefined,ContentType.form)
}
/** 所有  */
export const all = (data?: any) => {
  return https().request<RootData<any>>(`/api-ecocity/v1/curing/group-staff/all`, Method.GET, data, ContentType.json)
}