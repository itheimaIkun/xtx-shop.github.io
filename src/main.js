
import { createApp } from 'vue'
import { createPinia } from 'pinia'
//图片懒加载
import { LazyPlugin } from './directives/LazyPlugin'
//组件全局注册
import { ComponentsPlugin } from './components'

import App from './App.vue'
import router from './router'

//持久化缓存
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)
//持久化存储
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
//使用自定义插件
app.use(LazyPlugin)
//组件全局注册
app.use(ComponentsPlugin)
app.mount('#app')
