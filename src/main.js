import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { axios } from './http/base'

// 挂载vue.prototype上可直接使用this.axios
Vue.prototype.axios = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
