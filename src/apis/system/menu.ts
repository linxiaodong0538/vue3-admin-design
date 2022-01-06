/*
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-16 11:06:16
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-26 10:19:36
 */
import https from '@/utils/https'
// import { ContentType, Method } from 'axios-mapper'
import { RootObject } from '@/model/rootObject'
import { RemoteRoute, TopMenu } from '@/model/remoteRouteModel'
import { Method } from 'axios-mapper'

export const getTopMenu = (tenantId: string) => {
  return https().request<RootObject<TopMenu[]>>(`/api-sys/v1/top-menu/tenant/${tenantId}`)
}

export const getRoutesList = (params:{topMenuId:string} ) => {
  return https().request<RootObject<RemoteRoute[]>>('/api-sys/v1/menu/routes',Method.GET,params)
}
