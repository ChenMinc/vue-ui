import axios from 'axios'
import router from '../router/router'
import store from '../store'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/api/v1'

// 请求拦截
axios.interceptors.request.use(config => {
  if (store.state.user.token && config.url !== '/users/login') {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
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

/**
 * @param  {string} url
 * @param  {object} params={}
 */
const fetch = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * @param  {string} url
 * @param  {object} data={}
 */
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * @param  {string} url
 * @param  {object} data={}
 */
const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * @param  {string} url
 * @param  {object} params={}
 */
const del = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export { axios, fetch, post, put, del }
