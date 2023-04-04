import { createApp } from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'default-passive-events' // fix: Passive Event Listeners

import './styles/index.scss'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'

// router watch
import './permission'

// store
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// register all reactivity apis (`ref`, `computed`, `watch`, etc.)
import 'vue-global-api/reactivity'

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
