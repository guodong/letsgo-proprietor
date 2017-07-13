import {
  ADD_MESSAGE,
  SELECT_PRODUCT_FRONTEND_CATEGORY,
  INPUT_PRODUCT_NAME,
  INPUT_PRODUCT_DESCRIPTION,
  SELECT_PRODUCT_PROPERTY,
  CHECK_PRODUCT_PROPERTY_VALUE,
  INPUT_SKU_NAME,
  INPUT_SKU_BARCODE,
  INPUT_SKU_PRICE,
  INPUT_SKU_SELL_UNIT,
  INPUT_SKU_STOCK,
  CHECK_SKU_SELL_STATE,
  UPLOAD_SKU_IMAGE,
  DELETE_SKU,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_LIST_SUCCESS
} from '../mutation-type.js'
import { createProduct, getProductList } from '../../utils/productApi.js'
import Vue from 'vue'

const skuInitial = { name: '', barcode: '', price: null, stock: null, unit: '', state: 1, values: [], images: [] }
const state = {
  isCreating: false,
  createMessage: '',
  category_id: null,
  name: '',
  desc: '',
  properties: [],
  // { name, barcode, price, stock, unit, state, values, images: [] }
  skus: [],
  isListGetting: false,
  listGetMessage: ''
}

const getters = {
  // list: state => key => state[key] && state[key].data,
  // currentPage: state => key => state[key] && state[key].current_page,
  // lastPage: state => key => state[key] && state[key].last_page
}

const mutations = {
  [SELECT_PRODUCT_FRONTEND_CATEGORY]: (state, { categoryId }) => {
    state.category_id = categoryId
  },
  [INPUT_PRODUCT_NAME]: (state, { name }) => {
    // console.log('input product name', name)
    state.name = name
  },
  [INPUT_PRODUCT_DESCRIPTION]: (state, { desc }) => {
    state.desc = desc
  },
  [SELECT_PRODUCT_PROPERTY]: (state, { properties }) => {
    state.properties = properties
    // console.log('state properties', state.properties)
  },
  [CHECK_PRODUCT_PROPERTY_VALUE]: (state, { valueId, checked = true }) => {
    let value, property, valueKey
    // console.log('state properties', state.properties)
    for (property of state.properties) {
      for (valueKey = 0; valueKey < property.values.length; valueKey++) {
        if (property.values[valueKey].id === Number(valueId)) {
          value = property.values[valueKey]
          break
        }
      }
      if (value) {
        break
      }
    }
    // console.log('property value', value)
    // console.log('product value before handle', value.checked)
    property.values.splice(valueKey, 1, { ...value, checked: !value.checked })
    // console.log('product value after handle', value.checked)
  },
  [INPUT_SKU_NAME]: (state, { index, name, values = [] }) => {
    if (index === undefined) {
      state.skus.push({ ...skuInitial, name, values })
    } else {
      state.skus.splice(index, 1, { ...state.skus[index], name })
    }
  },
  [INPUT_SKU_BARCODE]: (state, { index, barcode, values = [] }) => {
    if (index === undefined) {
      state.skus.push({ ...skuInitial, barcode, values })
    } else {
      state.skus.splice(index, 1, { ...state.skus[index], barcode })
    }
  },
  [INPUT_SKU_PRICE]: (state, { index, price, values = [] }) => {
    if (index === undefined) {
      state.skus.push({ ...skuInitial, price, values })
    } else {
      state.skus.splice(index, 1, { ...state.skus[index], price })
    }
  },
  [INPUT_SKU_SELL_UNIT]: (state, { index, unit, values = [] }) => {
    if (index === undefined) {
      state.skus.push({ ...skuInitial, unit, values })
    } else {
      state.skus.splice(index, 1, { ...state.skus[index], unit })
    }
  },
  [INPUT_SKU_STOCK]: (state, { index, stock, values = [] }) => {
    if (index === undefined) {
      state.skus.push({ ...skuInitial, stock, values })
    } else {
      state.skus.splice(index, 1, { ...state.skus[index], stock })
    }
  },
  [CHECK_SKU_SELL_STATE]: (state, { index, sellState, values = [] }) => {
    if (index === undefined) {
      state.skus.push({ ...skuInitial, state: sellState, values })
    } else {
      state.skus.splice(index, 1, { ...state.skus[index], state: sellState })
    }
  },
  [UPLOAD_SKU_IMAGE]: (state, { index, images, values }) => {
    if (index === undefined) {
      state.skus.push({ ...skuInitial, images, values })
    } else {
      state.skus.splice(index, 1, { ...state.skus[index], images })
    }
  },
  [DELETE_SKU]: (state, { index }) => {
    if (index !== undefined) {
      state.skus.splice(index, 1)
    }
  },
  [CREATE_PRODUCT_START]: state => {
    state.isCreating = true
    state.createMessage = ''
  },
  [CREATE_PRODUCT_FAIL]: (state, { createMessage }) => {
    state.isCreating = false
    state.createMessage = createMessage
  },
  [CREATE_PRODUCT_SUCCESS]: (state, { product }) => {
    state.isCreating = false
    state.list.push(product)
    state.name = ''
    state.desc = ''
    state.skus = []
    state.properties = []
  },
  [GET_PRODUCT_LIST_START]: state => {
    state.isListGetting = true
    state.listGetMessage = ''
  },
  [GET_PRODUCT_LIST_FAIL]: (state, { listGetMessage }) => {
    state.isListGetting = false
    state.listGetMessage = listGetMessage
  },
  [GET_PRODUCT_LIST_SUCCESS]: (state, { key, data }) => {
    // console.log('mutation: get product list success', data)
    // state[key] = data
    Vue.set(state, key, data)
    state.isListGetting = false
  }
}

const actions = {
  selectCategory ({ commit }, payload) {
    commit(SELECT_PRODUCT_FRONTEND_CATEGORY, payload)
  },
  inputName ({ commit }, payload) {
    // console.log('input name payload', payload)
    commit(INPUT_PRODUCT_NAME, payload)
  },
  inputDescription ({ commit }, payload) {
    commit(INPUT_PRODUCT_DESCRIPTION, payload)
  },
  selectProperty ({ commit }, payload) {
    // console.log('select property', payload)
    commit(SELECT_PRODUCT_PROPERTY, payload)
  },
  checkValue ({ commit }, payload) {
    // console.log('check value payload', payload)
    commit(CHECK_PRODUCT_PROPERTY_VALUE, payload)
  },
  inputSkuName ({ commit }, payload) {
    // console.log('input sku name payload', payload)
    commit(INPUT_SKU_NAME, payload)
  },
  inputSkuBarcode ({ commit }, payload) {
    commit(INPUT_SKU_BARCODE, payload)
  },
  inputSkuPrice ({ commit }, payload) {
    commit(INPUT_SKU_PRICE, payload)
  },
  inputSkuSellUnit ({ commit }, payload) {
    commit(INPUT_SKU_SELL_UNIT, payload)
  },
  inputSkuStock ({ commit }, payload) {
    commit(INPUT_SKU_STOCK, payload)
  },
  checkSkuSellState ({ commit }, payload) {
    // console.log('check sell state', payload)
    commit(CHECK_SKU_SELL_STATE, payload)
  },
  uploadSkuImage ({ commit }, payload) {
    commit(UPLOAD_SKU_IMAGE, payload)
  },
  deleteSku ({ commit }, payload) {
    commit(DELETE_SKU, payload)
  },
  createProduct ({ commit, state, rootState }) {
    // console.log('create product')
    if (!state.skus.length) {
      commit(ADD_MESSAGE, { text: '请填写单品信息', type: 'warning' })
      return
    }
    commit(CREATE_PRODUCT_START)
    createProduct({
      product: {
        category_id: state.category_id,
        name: state.name,
        desc: state.desc,
        skus: state.skus.map(sku => ({
          ...sku,
          price: Math.ceil(sku.price * 100)
        }))
      },
      token: rootState.token
    })
      .then(product => {
        commit(ADD_MESSAGE, { text: '新商品添加成功', type: 'success' })
        commit(CREATE_PRODUCT_SUCCESS, { product })
      })
      .catch(createMessage => {
        commit(ADD_MESSAGE, { text: createMessage, type: 'danger' })
        commit(CREATE_PRODUCT_FAIL, { createMessage })
      })
  },
  getProductList: ({ commit, state }, { page, words }) => {
    let key = `${page}#${words}`
    if (!state[key]) {
      commit(GET_PRODUCT_LIST_START)
      getProductList({ page, words })
        .then(data => {
          commit(GET_PRODUCT_LIST_SUCCESS, {
            key, data
          })
        })
        .catch(listGetMessage => {
          commit(GET_PRODUCT_LIST_FAIL, { listGetMessage })
          commit(ADD_MESSAGE, {
            text: listGetMessage
          })
        })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
