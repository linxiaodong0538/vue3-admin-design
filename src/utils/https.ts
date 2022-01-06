/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-23 18:00:04
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-09 09:59:33
 */
import { useStore } from '@/store'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
import { ElMessage, ElNotification, ElLoading } from 'element-plus'
import settings from '@/config/default/setting.config'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { Base64 } from 'js-base64'

let loadingInstance: any
let loadingCount: number = 0

const https = (hasToken = true) => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {
      Authorization: hasToken ? useStore().state.user.token : ''
    }
  }
  const service = new HttpClient(config)

  // request拦截器
  service.httpClient.interceptors.request.use(
    config => {
      if (loadingCount == 0) {
        loadingInstance = ElLoading.service()
        loadingCount++
      }
      config.headers['Authorization'] = `Basic ${Base64.encode(`${settings.clientId}:${settings.clientSecret}`)}`
      if (useStore().state.user.token) {
        config.headers['Authorization'] = 'Bearer ' + useStore().state.user.token
      }
      return config
    },
    error => {
      console.log(error)
      Promise.reject(error)
    }
  )

  // 响应拦截器
  service.httpClient.interceptors.response.use(
    res => {
      loadingCount--
      if (loadingInstance && loadingCount == 0) {
        loadingInstance.close()
      }
      const { status } = res
      const code = res.data.code || status
      const msg = res.data.msg || res.data.message || '未知错误'
      if (code === 500) {
        ElMessage({
          message: msg,
          type: 'error'
        })
        return Promise.reject(new Error(msg))
      } else if (code !== 200) {
        ElNotification({
          title: msg,
          type: 'warning'
        })
        return Promise.reject('error')
      }
      return res
    },
    error => {
      console.log('err' + error)
      ElLoading.service().close()
      let { message } = error
      console.log('message', message)
      if (message == 'Network Error') {
        message = '后端接口连接异常'
      } else if (message.includes('timeout')) {
        message = '系统接口请求超时'
      } else if (message.includes('Request failed with status code 401')) {
        useStore().dispatch(UserActionTypes.ACTION_LOGIN_OUT, undefined)
        useRouter()
          .push(`/login?redirect=${useRoute().fullPath}`)
          .catch(err => {
            console.warn(err)
          })
      }
      ElMessage({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  return service
}
export default https
