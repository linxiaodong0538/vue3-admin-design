/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-07-16 10:52:11
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-08 10:35:14
 */
import { ActionTree, ActionContext } from 'vuex'
import { RootState, useStore } from '@/store'
import { state, UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { LoginModel } from '@/views/login/model/loginModel'
import { UserActionTypes } from './action-types'
import { loginRequest, userInfoRequest } from '@/apis/system/user'
import Keys from '@/constant/key'
import storage, { StorageType } from '@/utils/storage'
import { removeToken, setToken } from '@/utils/cookies'
import { PermissionActionType } from '../permission/action-types'
import router, { resetRouter } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { UserDesc } from '@/model/userModel'
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState<UserDesc>, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext, params: any): Promise<LoginModel>
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, role: string): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<UserState<UserDesc>, RootState> & Actions = {
  [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext, params) {
    return new Promise((resolve, reject) => {
      loginRequest(params)
        .then(res => {
          if (res?.code == 200) {
            storage.rcSetItem(StorageType.local, Keys.tokenKey, res.data.access_token)
            commit(UserMutationTypes.SET_TOKEN, res.data.access_token)
            resolve(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
  },

  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
    if (state.token === '') {
      throw Error('token is undefined!')
    }
    await userInfoRequest().then(res => {
      console.log('res', res)
      if (res?.code === 200) {
        commit(UserMutationTypes.SET_USER_INFO, res.data)
        return res
      } else {
        throw Error('Verification failed, please Login again.')
      }
    })
  },

  async [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, roleIds: string) {
    const token = roleIds + '-token'
    const store = useStore()
    commit(UserMutationTypes.SET_TOKEN, token)
    setToken(token)
    await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
    await store.dispatch(PermissionActionType.ACTION_SET_ROUTES, undefined)
    store.state.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  },

  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
    storage.rcRemoveItem(StorageType.local, Keys.tokenKey)
    commit(UserMutationTypes.SET_TOKEN, '')
    resetRouter()
  }
}
