/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-07-16 10:52:11
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-08 10:34:58
 */
import { ActionTree, ActionContext } from 'vuex'
import { RootState, useStore } from '@/store'
import { PermissionState } from './state'
import { Mutations } from './mutations'
import { PermissionMutationType } from './mutation-types'
import { PermissionActionType } from './action-types'
import router from '@/router'
// import { asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { getRoutesList, getTopMenu } from '@/apis/system/menu'

import { asyncJsonRoutes } from '@/utils/routeHelper'
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

export interface Actions {
  [PermissionActionType.ACTION_SET_ROUTES]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  async [PermissionActionType.ACTION_SET_ROUTES]({ commit }: AugmentedActionContext) {
    return new Promise((resolve, reject) => {
      const tenantId = useStore().state.user.userInfo.tenantId
      getTopMenu(tenantId).then(res => {
        if (res?.data) {
          const topMenus = res?.data
          const node = topMenus.find(x => x.name.includes('智慧园林'))
          if (node?.id) {
            const topMenuId = node.id
            getRoutesList({ topMenuId })
              .then(response => {
                const menus = response?.data
                if (menus) {
                  const remoteRoutes = asyncJsonRoutes(menus)
                  remoteRoutes.forEach((route: RouteRecordRaw) => {
                    router.addRoute(route)
                  })
                  commit(PermissionMutationType.SET_ROUTES, remoteRoutes)
                  resolve(remoteRoutes)
                }
              })
              .catch(error => {
                reject(error)
              })
          }
        }
      })
    })
  }
}
