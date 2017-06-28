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
        commit(GET_FRONTEND_CATEGORY_SUCCESS, { front })
        let categoryId = rootState.product.category_id
        if (categoryId && front.find(v => v.id === categoryId)) {
          return
        } else {
          let category = front.find(v => v.pid === 0)
          let code = category.code.substr(0, 2) + '0101'
          categoryId = front.find(v => v.code === code).id
          commit(SELECT_PRODUCT_FRONTEND_CATEGORY, { categoryId })
        }
      })
      .catch(frontGetMessage => {
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
