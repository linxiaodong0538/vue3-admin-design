/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-07-21 15:49:13
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-09 13:54:02
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { useStore } from './store'
import { UserActionTypes } from './store/modules/user/action-types'
import { PermissionActionType } from './store/modules/permission/action-types'
import { ElMessage } from 'element-plus'
import whiteList from './config/default/whitelist'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
  // Start progress bar
  if (from.path == to.path) {
    return next(false)
  }
  NProgress.start()
  const store = useStore()
  // Determine whether the user has logged in
  if (store.state.user.token) {
    if (to.path.includes('/login')) {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // Check whether the user has obtained his permission roles
      if (!store.state.user.userInfo.roleIds) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
          await store.dispatch(PermissionActionType.ACTION_SET_ROUTES, undefined)
          // const roles = store.state.user.roles
          // Generate accessible routes map based on role
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          console.log('login')
          // Remove token and redirect to login page
          store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)

          ElMessage.error((err as any) || 'Has Error')
          NProgress.done()
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // Finish progress bar
  // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
  NProgress.done()
})
