/*
 * @Author: Lw
 * @Date: 2021-10-09 16:21:45
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-11 09:16:09
 */
import https from '@/utils/https'
import { Method, ContentType } from 'axios-mapper'
import { RootData, RootObject } from '../../model/rootObject'

export const getAll = (data?: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/sensor-device/all', Method.GET, data, ContentType.form)
}

export const getById = (id?: any) => {
  return https().request<RootObject<any>>(`/api-ecocity/v1/sensor-device/${id}`, Method.GET)
}
