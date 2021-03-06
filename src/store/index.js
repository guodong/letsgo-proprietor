import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import mutations from './mutations.js'
import * as getters from './getters.js'
import admin from './modules/admin.js'
import category from './modules/category.js'
import product from './modules/product.js'
import property from './modules/property.js'
import order from './modules/order.js'
import { GET_TOKEN_SUCCESS } from './mutation-type.js'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    phone: '',
    password: '',
    isTokenGetting: false,
    tokenGetError: '',
    messages: [
      // { type: success|warning|danger, text, time: ms }
      // { type: 'success', text: 'A success messsage test', time: 4000 }
    ]
  },
  actions,
  getters,
  mutations,
  modules: {
    admin, category, product, property, order
  }
})

store.subscribe((mutation, state) => {
  // console.log(mutation, state)
  switch (mutation.type) {
    case GET_TOKEN_SUCCESS:
      localStorage.setItem('token', state.token)
      break
  }
})

export default store

