/*
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-16 10:52:11
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-17 17:46:30
 */
import { MutationTree } from 'vuex'
import { PermissionState } from './state'
import { PermissionMutationType } from './mutation-types'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { RemoteRoute } from '@/model/remoteRouteModel'

export type Mutations<S = PermissionState> = {
  [PermissionMutationType.SET_ROUTES](state: S, routes: RemoteRoute[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationType.SET_ROUTES](state: PermissionState, routes: RemoteRoute[]) {
    state.routes = constantRoutes.concat(routes as unknown as RouteRecordRaw[])
    state.dynamicRoutes = routes as unknown as RouteRecordRaw[]
  }
}
