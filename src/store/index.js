import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import articleEditor from './module/articleEditor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    articleEditor
  }
})
