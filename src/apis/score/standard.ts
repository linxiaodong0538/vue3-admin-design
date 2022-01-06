/*
 * @Author: XNY
 * @Date: 2021-09-22 10:43:50
 * @LastEditTime: 2021-09-26 10:26:39
 * @LastEditors: Lx
 * @Description:
 * @FilePath: \scs-ecocity-web\src\apis\score\standard.ts
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData } from './../../model/rootObject'

/** 列表 */
export const getList = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/score/score',
    Method.GET,
    data,
    ContentType.form
  )
}
/** 新增  */
export const scoreAdd = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/score/score',
    Method.POST,
    data,
    ContentType.json
  )
}
/** 修改 */
export const scoreUpdate = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/score/score',
    Method.PUT,
    data,
    ContentType.json
  )
}
/** 删除  */
export const scoreRemove = (id: string) => {
  return https().request<RootData<any>>(
    `/api-ecocity/v1/score/score/${id}`,
    Method.DELETE,
    undefined,
    ContentType.json
  )
}
/** 详情  */
export const scoreView = (id: string) => {
  return https().request<RootData<any>>(
    `/api-ecocity/v1/score/score/${id}`,
    Method.GET,
    undefined,
    ContentType.json
  )
}
/** 获取整个列表 /api-ecocity/v1/score/score/all */
export const scoreAll = (data?: any) => {
  return https().request<RootData<any>>(
    `/api-ecocity/v1/score/score/all`,
    Method.GET,
    data,
    ContentType.json
  )
}
