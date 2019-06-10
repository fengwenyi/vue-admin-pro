import Vue from 'vue'
import Vuex from 'vuex'

import login from './module/login'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    login
  }
})
