/*
 * @Author: Lw
 * @Date: 2021-09-24 14:28:13
 * @LastEditTime: 2021-09-26 15:42:04
 * @LastEditors: Lw
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from './../../model/rootObject'

export const getList = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/patrol/patrol-anomalous-event',
    Method.GET,
    data,
    ContentType.form
  )
}
export const getAll = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/patrol/patrol-anomalous-event/all',
    Method.GET,
    data,
    ContentType.form
  )
}

export const add = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/patrol/patrol-anomalous-event',
    Method.POST,
    data,
    ContentType.json
  )
}

export const edit = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/patrol/patrol-anomalous-event',
    Method.PUT,
    data,
    ContentType.json
  )
}

export const remove = (id?: string) => {
  return https().request<RootObject<any>>(
    `/api-ecocity/v1/patrol/patrol-anomalous-event/${id}`,
    Method.DELETE,
    undefined,
    ContentType.json
  )
}
