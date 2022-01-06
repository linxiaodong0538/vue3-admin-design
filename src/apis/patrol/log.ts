/*
 * @Author: Lw
 * @Date: 2021-09-24 10:42:07
 * @LastEditTime: 2021-09-26 14:32:27
 * @LastEditors: Lw
 */

import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from './../../model/rootObject'

export const getCount = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/patrol/patrol-record/count',
    Method.GET,
    data,
    ContentType.form
  )
}

export const getList = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/patrol/patrol-record',
    Method.GET,
    data,
    ContentType.form
  )
}

export const add = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/patrol/patrol-record',
    Method.POST,
    data,
    ContentType.json
  )
}

export const edit = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/patrol/patrol-record',
    Method.PUT,
    data,
    ContentType.json
  )
}

export const remove = (id?: string) => {
  return https().request<RootObject<any>>(
    `/api-ecocity/v1/patrol/patrol-record/${id}`,
    Method.DELETE,
    undefined,
    ContentType.json
  )
}
