/*
 * @Author: Lw
 * @Date: 2021-09-27 14:45:12
 * @LastEditors: Lw
 * @LastEditTime: 2021-09-28 10:34:48
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from '../../model/rootObject'

export const getList = (data?: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/sensor-monitor-factor', Method.GET, data, ContentType.form)
}
export const getAll = (data?: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/sensor-monitor-factor/all', Method.GET, data, ContentType.form)
}

export const add = (data?: any) => {
  return https().request<RootObject<any>>('/api-ecocity/v1/sensor-monitor-factor', Method.POST, data, ContentType.json)
}

export const edit = (data?: any) => {
  return https().request<RootObject<any>>('/api-ecocity/v1/sensor-monitor-factor', Method.PUT, data, ContentType.json)
}

export const remove = (id?: string) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/sensor-monitor-factor/${id}`, Method.DELETE, undefined, ContentType.json)
}
