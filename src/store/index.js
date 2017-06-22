import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as mutations from './mutations.js'
import * as getters from './getters.js'
import admin from './modules/admin.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  actions,
  getters,
  mutations,
  modules: {
    admin
  }
})
