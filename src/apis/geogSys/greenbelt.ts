/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-24 17:16:36
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-09 17:29:22
 */

import https from '@/utils/https'
import { RootData, RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
import qs from 'qs'

export const defaultModel = {
  id: undefined,
  name: undefined,
  areaSize: undefined,
  addr: undefined,
  type: undefined,
  areaId: undefined,
  regionStr: undefined,
  situation: undefined
}

export const getList = (params: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/greenland', Method.GET, params)
}

export const create = (params: any) => {
  return https().request('/api-ecocity/v1/greenland', Method.POST, params)
}

export const update = (data: any) => {
  return https().request('/api-ecocity/v1/greenland', Method.PUT, data)
}

export const removeBatch = ({ ids }: any) => {
  return https().request(
    `/api-ecocity/v1/greenland/batch?${qs.stringify({ ids: ids }, { arrayFormat: 'brackets' })}`,
    Method.DELETE,
    undefined,
    ContentType.form
  )
}

export const getAll = (params?: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/greenland/all', Method.GET, params, ContentType.json)
}

export const regionSave = (params: any) => {
  return https().request<RootObject<any>>('/api-ecocity/v1/greenland/region', Method.POST, params, ContentType.json)
}
