
import { MutationTree } from 'vuex'
import { UserState } from './state'
import { UserMutationTypes } from './mutation-types'
import { UserDesc } from '@/model/userModel'

export type Mutations<S = UserState<UserDesc>> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_USER_INFO](state: S, userInfo: UserDesc): void
}

export const mutations: Mutations = {
  [UserMutationTypes.SET_TOKEN](state: UserState<UserDesc>, token: string) {
    state.token = token
  },

  [UserMutationTypes.SET_USER_INFO](state: UserState<UserDesc>, userInfo: any) {
    state.userInfo = userInfo
  }
}
