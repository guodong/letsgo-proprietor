import {
  INPUT_ACCOUNT_PHONE,
  INPUT_ACCOUNT_PASSWORD,
  GET_TOKEN_START,
  GET_TOKEN_FAIL,
  GET_TOKEN_SUCCESS,
  ADD_MESSAGE,
  REMOVE_MESSAGE
} from './mutation-type.js'

export default {
  [INPUT_ACCOUNT_PHONE]: (state, { phone }) => {
    state.phone = phone
  },
  [INPUT_ACCOUNT_PASSWORD]: (state, { password }) => {
    state.password = password
  },
  [GET_TOKEN_START]: state => {
    state.isTokenGetting = true
    state.tokenGetError = ''
  },
  [GET_TOKEN_FAIL]: (state, { tokenGetError }) => {
    state.isTokenGetting = false
    state.tokenGetError = tokenGetError
  },
  [GET_TOKEN_SUCCESS]: (state, { token }) => {
    state.isTokenGetting = false
    state.token = token
  },
  // { type: success | warning | danger, text, time }
  [ADD_MESSAGE]: (state, { text, type = 'success', time = 3000 }) => {
    state.messages.push({ text, type, time })
  },
  [REMOVE_MESSAGE]: (state, { index }) => {
    state.messages.splice(index, 1)
  }
}
