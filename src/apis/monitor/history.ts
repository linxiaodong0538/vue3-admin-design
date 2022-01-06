/*
 * @Author: Lw
 * @Date: 2021-09-28 10:31:55
 * @LastEditors: Lw
 * @LastEditTime: 2021-09-28 15:40:45
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from '../../model/rootObject'

export const getListDay = (data?: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/sensor-day-history', Method.GET, data, ContentType.form)
}
export const getAllDay = (data?: any) => {
  return https().request<RootObject<any>>('/api-ecocity/v1/sensor-day-history/all', Method.GET, data, ContentType.json)
}
export const getListHour = (data?: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/sensor-hour-history', Method.GET, data, ContentType.form)
}
export const getAllHour = (data?: any) => {
  return https().request<RootObject<any>>('/api-ecocity/v1/sensor-hour-history/all', Method.GET, data, ContentType.json)
}
export const getListMinute = (data?: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/sensor-minute-history', Method.GET, data, ContentType.form)
}
export const getAllMinute = (data?: any) => {
  return https().request<RootObject<any>>('/api-ecocity/v1/sensor-minute-history/all', Method.GET, data, ContentType.json)
}
