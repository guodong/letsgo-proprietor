import {
  INPUT_ACCOUNT_PHONE,
  INPUT_ACCOUNT_PASSWORD,
  GET_TOKEN_START,
  GET_TOKEN_FAIL,
  GET_TOKEN_SUCCESS,
  ADD_MESSAGE,
  REMOVE_MESSAGE
} from './mutation-type.js'
import { checkPhone, checkPassword } from '../utils/formatChecker.js'
import { getToken } from '../utils/adminApi.js'
import router from '../router'

// { phone }
export const inputPhone = ({ commit }, payload) => {
  commit(INPUT_ACCOUNT_PHONE, payload)
}

// password
export const inputPassword = ({ commit }, payload) => {
  commit(INPUT_ACCOUNT_PASSWORD, payload)
}

export const submitLoginData = ({ state, commit }) => {
  let { phone, password, isTokenGetting } = state
  if (isTokenGetting) {
    commit(ADD_MESSAGE, { text: '请求发送中，请稍等', type: 'warning' })
    return
  }
  if (!checkPhone(phone)) {
    commit(ADD_MESSAGE, { text: '手机号码格式错误', type: 'warning' })
    commit(GET_TOKEN_FAIL, {
      tokenGetError: '手机号码格式错误'
    })
    return
  }
  if (!checkPassword(password)) {
    commit(ADD_MESSAGE, { text: '密码格式错误', type: 'warning' })
    commit(GET_TOKEN_FAIL, {
      tokenGetError: '密码格式错误'
    })
    return
  }
  commit(GET_TOKEN_START)
  getToken(phone, password)
    .then(token => {
      commit(GET_TOKEN_SUCCESS, { token })
      // console.log('current route', router.currentRoute)
      router.push(router.currentRoute.query.redirect || '/')
    })
    .catch(tokenGetError => {
      commit(ADD_MESSAGE, { text: tokenGetError, type: 'danger' })
      commit(GET_TOKEN_FAIL, { tokenGetError })
    })
}

// { text, time = 1000, type = 'success' }
export const addMessage = ({ commit }, payload) => {
  commit(ADD_MESSAGE, { type: 'success', time: 1000, ...payload })
}

// { index = 0 }
export const removeMessage = ({ commit }, payload) => {
  commit(REMOVE_MESSAGE, { index: 0, ...payload })
}
