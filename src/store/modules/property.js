import {
  ADD_MESSAGE,
  GET_PROPERTY_START,
  GET_PROPERTY_FAIL,
  GET_PROPERTY_SUCCESS
} from '../mutation-type.js'
import { getProperty } from '../../utils/propertyApi.js'

const state = {
  isPropertyGetting: false,
  propertyGetMessage: '',
  properties: []
}

const getters = {}

const mutations = {
  [GET_PROPERTY_START]: state => {
    state.isPropertyGetting = true
    state.propertyGetMessage = ''
  },
  [GET_PROPERTY_FAIL]: (state, { propertyGetMessage }) => {
    state.isPropertyGetting = false
    state.propertyGetMessage = propertyGetMessage
  },
  [GET_PROPERTY_SUCCESS]: (state, { properties }) => {
    state.isPropertyGetting = false
    state.properties = properties
  }
}

const actions = {
  getProperty ({ commit }) {
    getProperty()
      .then(properties => {
        commit(GET_PROPERTY_SUCCESS, { properties })
      })
      .catch(propertyGetMessage => {
        commit(ADD_MESSAGE, { type: 'danger', text: propertyGetMessage })
        commit(GET_PROPERTY_FAIL, { propertyGetMessage })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
