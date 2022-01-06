/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-24 17:16:36
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-28 14:15:48
 */

import https from '@/utils/https'
import { RootData } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
import qs from 'qs'



export const getList = (params: any) => {
  return https().request<RootData<any>>('/api-ecocity/v1/greenline', Method.GET, params)
}

export const create = (params: any) => {
  return https().request('/api-ecocity/v1/greenline', Method.POST, params)
}

export const update = (data: any) => {
  return https().request('/api-ecocity/v1/greenline', Method.PUT, data)
}

export const removeBatch = ({ ids }: any) => {
  return https().request(`/api-ecocity/v1/greenline/batch?${qs.stringify({ ids: ids }, { arrayFormat: 'brackets' })}`, Method.DELETE, undefined, ContentType.form)
}