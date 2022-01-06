/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-23 11:13:28
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-27 15:44:32
 */

import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import '@/mock'
import axios from 'axios'

export const getList = (data?: any) => {
  return axios.get('/api/map')
}
