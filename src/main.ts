/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-07-16 09:57:26
 * @LastEditors: Lx
 * @LastEditTime: 2021-11-04 17:42:36
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import '@/styles/index.scss'
import 'normalize.css'
import '@/assets/iconfont/iconfont.css'
import '@/permission'
import { loadAllPlugins } from './plugins'
import BasicContainer from '@/components/basic-container/main.vue'
import { loadStyle } from './utils'
import { iconfontUrl, iconfontVersion } from '@/config/default/iconList'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })

// 动态加载阿里云字体库
iconfontVersion.forEach((ele: any) => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

app.component('BasicContainer', BasicContainer)

// 加载所有插件
loadAllPlugins(app)
app.use(store).use(router).mount('#app')
