import {
  ADD_MESSAGE,
  GET_ORDER_LIST_START,
  GET_ORDER_LIST_FAIL,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_INFORMATION_START,
  GET_ORDER_INFORMATION_FAIL,
  GET_ORDER_INFORMATION_SUCCESS
} from '../mutation-type.js'
import Vue from 'vue'
import { getOrderList, getOrderInformation } from '../../utils/orderApi.js'

const state = {
  isListGetting: false,
  listGetMessage: '',
  isInformationGetting: false,
  informationGetMessage: '',
  count: null
}

const getters = {}

const mutations = {
  [GET_ORDER_LIST_START]: state => {
    state.isListGetting = true
    state.listGetMessage = ''
  },
  [GET_ORDER_LIST_FAIL]: (state, { listGetMessage }) => {
    state.isListGetting = false
    state.listGetMessage = listGetMessage
  },
  [GET_ORDER_LIST_SUCCESS]: (state, { key, data }) => {
    state.isListGetting = false
    Vue.set(state, key, data)
  },
  [GET_ORDER_INFORMATION_START]: state => {
    state.isInformationGetting = false
    state.informationGetMessage = ''
  },
  [GET_ORDER_INFORMATION_FAIL]: (state, { informationGetMessage }) => {
    state.isInformationGetting = true
    state.informationGetMessage = informationGetMessage
  },
  [GET_ORDER_INFORMATION_SUCCESS]: (state, { count }) => {
    state.isInformationGetting = false
    state.count = count
  }
}

const actions = {
  getOrderList: ({ commit, rootState }, { words = '', page = 1 }) => {
    commit(GET_ORDER_LIST_START)
    getOrderList({ token: rootState.token, params: { page, words } })
      .then(order => {
        commit(GET_ORDER_LIST_SUCCESS, { key: `${page}#${words}`, data: order })
      })
      .catch(listGetMessage => {
        // console.log(listGetMessage)
        commit(GET_ORDER_LIST_FAIL, { listGetMessage })
        commit(ADD_MESSAGE, { text: listGetMessage })
      })
  },
  getOrderInformation: ({ commit, rootState }) => {
    commit(GET_ORDER_INFORMATION_START)
    getOrderInformation({ token: rootState.token })
      .then(count => {
        commit(GET_ORDER_INFORMATION_SUCCESS, { count })
      })
      .catch(informationGetMessage => {
        commit(GET_ORDER_INFORMATION_FAIL, { informationGetMessage })
        commit(ADD_MESSAGE, { text: informationGetMessage })
      })
  }
}

export default { state, getters, mutations, actions }

