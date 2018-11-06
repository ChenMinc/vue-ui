import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/auth/Login.vue'
import Main from './views/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
