import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(dataV)
app.use(ElementPlus)
app.mount('#app')
