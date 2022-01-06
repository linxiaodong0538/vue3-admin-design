/*
 * @Author: XNY
 * @Date: 2021-09-24 15:04:23
 * @LastEditTime: 2021-09-30 09:46:49
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\apis\score\resource.ts
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from './../../model/rootObject'

/** 列表 */
export const getList = (data?: any) => {
  return https().request<RootData<any>>(`/api-ecocity/v1/system/resource`,Method.GET,data,ContentType.form)
}
/** 保存 */
export const resourceCreate = (data?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/system/resource`,Method.POST,data,ContentType.json)
}
/** 修改 */
export const resourceUpdate = (data?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/system/resource`,Method.PUT,data,ContentType.json)
}
/** 删除 */
export const resourceRemove = (ids?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/system/resource/batch?${ids}`,Method.DELETE,undefined,ContentType.form)
}
/** 详情 /api-ecocity/v1/system/resource/{id} */
export const resourceGet = (id?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/system/resource/${id}`,Method.GET,undefined,ContentType.form)
}
/** 所有  */
export const resourceAll = (data?: any) => {
  return https().request<RootData<any>>(
    `/api-ecocity/v1/system/resource/all`,
    Method.GET,
    data,
    ContentType.form
  )
}
