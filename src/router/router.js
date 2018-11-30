import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/views/auth/Login'], resolve)
    },
    {
      path: '', // 默认地址为登录页
      name: 'Login',
      component: resolve => require(['@/views/auth/Login'], resolve)
    },
    {
      path: '/main',
      name: 'Main',
      component: resolve => require(['@/views/Main'], resolve),
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'article',
        name: 'ArticleList',
        component: resolve => require(['@/views/article/List'], resolve),
        meta: {
          requireAuth: true
        }
      }, {
        path: 'user',
        name: 'UserList',
        component: resolve => require(['@/views/user/List'], resolve),
        meta: {
          requireAuth: true
        }
      }, {
        path: 'user/setting',
        name: 'Setting',
        component: resolve => require(['@/views/user/Setting'], resolve),
        meta: {
          requireAuth: true
        }
      }, {
        path: '',
        name: 'Welcome',
        component: resolve => require(['@/views/common/Welcome'], resolve),
        meta: {
          requireAuth: true
        }
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 如果需要拦截
    if (store.state.user.token) { // TODO 从vuex或者localstore获取token判断是否已登录，如果已登录
      next()
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
