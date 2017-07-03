import {
  ADD_MESSAGE,
  GET_FRONTEND_CATEGORY_START,
  GET_FRONTEND_CATEGORY_FAIL,
  GET_FRONTEND_CATEGORY_SUCCESS,
  SELECT_PRODUCT_FRONTEND_CATEGORY
} from '../mutation-type.js'
import { getFrontendCategory } from '../../utils/categoryApi.js'

const state = {
  isFrontGetting: false,
  frontGetMessage: '',
  front: []
}

const getters = {}

const actions = {
  getFrontendCategory ({ commit, rootState }) {
    commit(GET_FRONTEND_CATEGORY_START)
    getFrontendCategory()
      .then(front => {
        let categoryId = rootState.product.category_id
        // console.log('product category id', categoryId)
        if (categoryId && front.find(v => v.id === categoryId)) {
          // console.log('exist product category id')
          return
        } else {
          // console.log('frontend category', front)
          let category = front.find(v => Number(v.pid) === 0)
          // console.log('category find', category)
          let code = category.code.substr(0, 2) + '0101'
          categoryId = front.find(v => v.code === code).id
          // console.log('initial product create category id', categoryId)
          commit(SELECT_PRODUCT_FRONTEND_CATEGORY, { categoryId })
        }
        commit(GET_FRONTEND_CATEGORY_SUCCESS, { front })
        // console.log('execute here')
      })
      .catch(frontGetMessage => {
        // console.log('get frontend category error', frontGetMessage)
        commit(ADD_MESSAGE, { text: frontGetMessage, type: 'danger' })
        commit(GET_FRONTEND_CATEGORY_FAIL, { frontGetMessage })
      })
  }
}

const mutations = {
  [GET_FRONTEND_CATEGORY_START] (state) {
    state.isFrontGetting = true
    state.frontGetMessage = ''
  },
  [GET_FRONTEND_CATEGORY_FAIL] (state, { frontGetMessage }) {
    state.isFrontGetting = false
    state.frontGetMessage = frontGetMessage
  },
  [GET_FRONTEND_CATEGORY_SUCCESS] (state, { front }) {
    state.isFrontGetting = false
    state.front = front
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
