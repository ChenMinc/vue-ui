import axios from 'axios'
import router from '../router/router'
import store from '../store'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://192.168.199.108:7001/api/v1'

// 请求拦截
axios.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.header.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  console.error('222222222', error)
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // TODO 清除token信息
        router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
        break
      case 403:
        router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
        break
    }
  }
  return Promise.reject(error)
})

export default axios
