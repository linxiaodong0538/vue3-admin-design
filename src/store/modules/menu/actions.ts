
import { Mutations } from './mutations'
import { MenuActionTypes } from './action-types'
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
  dispatch<K extends keyof MenuActionTypes>(key: MenuActionTypes[K], params: any): void
}

export interface Actions {
  [MenuActionTypes.ACTION_GET_TOP_MENU](
    { commit, dispatch }: AugmentedActionContext,
    params: any
  ): void
}

export const actions: Actions = {
  [MenuActionTypes.ACTION_GET_TOP_MENU]({ dispatch }: AugmentedActionContext, params) {
    dispatch(MenuActionTypes.ACTION_GET_MENU, params)
  }
}
