/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-17 14:35:05
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-26 10:20:44
 */

import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData } from './../../model/rootObject'

export const getList = (data?: any) => {
  return https().request<RootData<any>>('/api-rule/v1/rule-log', Method.GET, data, ContentType.form)
}
