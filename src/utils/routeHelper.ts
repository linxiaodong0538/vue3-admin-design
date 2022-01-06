/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-07-16 10:56:50
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-09 10:39:47
 */
import layout from '@/layout/Index.vue'
import ParentView from '@/components/ParentView/Index.vue'
import { RemoteRoute } from '@/model/remoteRouteModel'

export const asyncJsonRoutes = (routes: any) => {
  const aRouter: any = []
  routes.filter((route: any) => {
    let oRouter: any = {
      id: route.id,
      parentId: route.id,
      path: route.path,
      name: route.name,
      source: route.source,
      children: !route.children || !route.children.length ? [] : asyncJsonRoutes(route.children),
      component: (() => {
        if (route.children && route.children.length) {
          return layout
        }
        return require(`@/views${route.path}`).default
      })()
    }
    aRouter.push(oRouter)
  })
  return aRouter
}

// 默认跳转第一个菜单
export const firstMenus = (menus: any) => {
  console.log('menus', menus)
  let src = ''
  for (let i = 0; i < menus.length; i++) {
    if (!menus[i].children.length && menus[i].name == '首页') {
      src = menus[i].path
      break
    } else {
      if (menus[i].children.length === 0 || !menus[i].children) {
        src = menus[i].path
        break
      } else {
        src = menus[i].children[0].path
        break
      }
    }
  }
  return src
}
