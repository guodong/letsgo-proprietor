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
  GET_PRODUCT_LIST_SUCCESS,
  MODIFY_SKU_START,
  MODIFY_SKU_FAIL,
  MODIFY_SKU_SUCCESS,
  GET_PRODUCT_START,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  MODIFY_PRODUCT_FRONTEND_CATEGORY,
  MODIFY_PRODUCT_NAME,
  MODIFY_PRODUCT_DESCRIPTION,
  MODIFY_PRODUCT_SKU_NAME,
  MODIFY_PRODUCT_SKU_BARCODE,
  MODIFY_PRODUCT_SKU_PRICE,
  MODIFY_PRODUCT_SKU_SELL_UNIT,
  MODIFY_PRODUCT_SKU_STOCK,
  MODIFY_PRODUCT_SKU_SELL_STATE,
  MODIFY_PRODUCT_SKU_IMAGE,
  MODIFY_PRODUCT_START,
  MODIFY_PRODUCT_FAIL,
  MODIFY_PRODUCT_SUCCESS,
  CANCEL_PRODUCT_MODIFY
} from '../mutation-type.js'
import { createProduct, getProductList, editSku, getProduct, editProduct } from '../../utils/productApi.js'
import Vue from 'vue'
import router from '../../router'

const skuInitial = { name: '', barcode: '', price: null, stock: null, unit: '', state: 1, values: [], images: [] }
const editDataInitial = {
  frontendCategoryId: null,
  name: '',
  desc: '',
  skus: []
}

const state = {
  isCreating: false,
  createMessage: '',
  category_id: null,
  name: '',
  desc: '',
  properties: [],
  // { name, barcode, price, stock, unit, state, values, images: [] }
  skus: [],
  list: [],
  isListGetting: false,
  listGetMessage: '',
  isSkuModifying: false,
  skuModifyMessage: '',
  isEditing: false,
  editMessage: false,
  editData: JSON.parse(JSON.stringify(editDataInitial)),
  isGetting: false,
  getMessage: ''
}

const getters = {
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
    // console.log('check sell state', sellState)
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
    data.data.forEach(v => {
      let index = state.list.findIndex(product => product.id === v.id)
      if (index === -1) {
        state.list.push(v)
      } else {
        state.list.splice(index, 1, v)
      }
    })
  },
  [MODIFY_SKU_START]: state => {
    state.isSkuModifying = true
    state.skuModifyMessage = ''
  },
  [MODIFY_SKU_FAIL]: (state, { skuModifyMessage }) => {
    state.isSkuModifying = false
    state.skuModifyMessage = skuModifyMessage
  },
  [MODIFY_SKU_SUCCESS]: (state, { key, productIndex, skuIndex, skuData }) => {
    state.isSkuModifying = false
    state[key].data[productIndex].skus.splice(skuIndex, 1, skuData)
  },
  [GET_PRODUCT_START]: state => {
    state.isGetting = true
    state.getMessage = ''
  },
  [GET_PRODUCT_FAIL]: (state, { getMessage }) => {
    state.isGetting = false
    state.getMessage = getMessage
  },
  [GET_PRODUCT_SUCCESS]: (state, { product }) => {
    state.isGetting = false
    // console.log('product getted', product)
    let index = state.list.findIndex(v => v.id === product.id)
    // console.log('index find', index)
    if (index === -1) {
      state.list.push(product)
    } else {
      state.list.splice(index, 1, product)
    }
  },
  [MODIFY_PRODUCT_FRONTEND_CATEGORY]: (state, { frontendCategoryId }) => {
    state.editData.frontendCategoryId = frontendCategoryId
  },
  [MODIFY_PRODUCT_NAME]: (state, { name }) => {
    state.editData.name = name
  },
  [MODIFY_PRODUCT_DESCRIPTION]: (state, { desc }) => {
    state.editData.desc = desc
  },
  [MODIFY_PRODUCT_SKU_NAME]: (state, { name, id }) => {
    let sku = state.editData.skus.find(v => v.id === id)
    if (!sku) {
      state.editData.skus.push({ id, name })
    } else {
      Vue.set(sku, 'name', name)
    }
  },
  [MODIFY_PRODUCT_SKU_BARCODE]: (state, { id, barcode }) => {
    let sku = state.editData.skus.find(v => v.id === id)
    if (!sku) {
      state.editData.skus.push({ id, barcode })
    } else {
      Vue.set(sku, 'barcode', barcode)
    }
  },
  [MODIFY_PRODUCT_SKU_PRICE]: (state, { id, price }) => {
    let sku = state.editData.skus.find(v => v.id === id)
    if (!sku) {
      state.editData.skus.push({ id, price })
    } else {
      Vue.set(sku, 'price', price)
    }
  },
  [MODIFY_PRODUCT_SKU_SELL_UNIT]: (state, { id, unit }) => {
    let sku = state.editData.skus.find(v => v.id === id)
    if (!sku) {
      state.editData.skus.push({ id, unit })
    } else {
      Vue.set(sku, 'unit', unit)
    }
  },
  [MODIFY_PRODUCT_SKU_STOCK]: (state, { id, stock }) => {
    let sku = state.editData.skus.find(v => v.id === id)
    if (!sku) {
      state.editData.skus.push({ id, stock })
    } else {
      Vue.set(sku, 'stock', stock)
    }
  },
  [MODIFY_PRODUCT_SKU_SELL_STATE]: (state, { id, sellState }) => {
    let sku = state.editData.skus.find(v => v.id === id)
    if (!sku) {
      state.editData.skus.push({ id, state: sellState })
    } else {
      Vue.set(sku, 'state', sellState)
    }
  },
  [MODIFY_PRODUCT_SKU_IMAGE]: (state, { id, images }) => {
    let sku = state.editData.skus.find(v => v.id === id)
    if (!sku) {
      state.editData.skus.push({ id, images })
    } else {
      Vue.set(sku, 'images', images)
    }
  },
  [MODIFY_PRODUCT_START]: state => {
    state.isEditing = true
    state.editMessage = ''
  },
  [MODIFY_PRODUCT_FAIL]: (state, { editMessage }) => {
    state.isEditing = false
    state.editMessage = editMessage
  },
  [MODIFY_PRODUCT_SUCCESS]: (state, { product }) => {
    let index = state.list.findIndex(v => v.id === product.id)
    if (index === -1) {
      state.list.push(product)
    } else {
      state.list.splice(index, 1, product)
    }
    state.editData = JSON.parse(JSON.stringify(editDataInitial))
  },
  [CANCEL_PRODUCT_MODIFY]: state => {
    state.editData = JSON.parse(JSON.stringify(editDataInitial))
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
  getProductList ({ commit, state }, { page, words }) {
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
  },
  modifySku ({ commit, state, rootState }, { key, productIndex, skuIndex, id, data }) {
    commit(MODIFY_SKU_START)
    console.log('sku data will be set', data)
    editSku({ token: rootState.token, id, data })
      .then(skuData => {
        // console.log('sku data responsed', skuData)
        commit(MODIFY_SKU_SUCCESS, { key, productIndex, skuIndex, skuData })
      })
      .catch(skuModifyMessage => {
        // console.log('sku data modify error', skuModifyMessage)
        commit(ADD_MESSAGE, { text: skuModifyMessage })
        commit(MODIFY_SKU_FAIL, { skuModifyMessage })
      })
  },
  getProduct ({ commit }, { id }) {
    commit(GET_PRODUCT_START)
    getProduct({ id })
      .then(res => {
        switch (res.code) {
          case 0:
            commit(GET_PRODUCT_SUCCESS, { product: res.data })
            break
          default:
            throw new Error(res.message)
        }
      })
      .catch(err => {
        commit(GET_PRODUCT_FAIL, { getMessage: err.message })
        commit(ADD_MESSAGE, { text: err.message, type: 'error' })
      })
  },
  modifyProductFrontendCategory ({ commit }, { categoryId }) {
    commit(MODIFY_PRODUCT_FRONTEND_CATEGORY, { frontendCategoryId: categoryId })
  },
  modifyProductName ({ commit }, { name }) {
    commit(MODIFY_PRODUCT_NAME, { name })
  },
  modifyProductDescription ({ commit }, { desc }) {
    commit(MODIFY_PRODUCT_DESCRIPTION, { desc })
  },
  modifyProductSkuName ({ commit }, { name, id }) {
    commit(MODIFY_PRODUCT_SKU_NAME, { id, name })
  },
  modifyProductSkuBarcode ({ commit }, { id, barcode }) {
    commit(MODIFY_PRODUCT_SKU_BARCODE, { id, barcode })
  },
  modifyProductSkuPrice ({ commit }, { id, price }) {
    commit(MODIFY_PRODUCT_SKU_PRICE, { id, price })
  },
  modifyProductSkuSellUnit ({ commit }, { id, unit }) {
    commit(MODIFY_PRODUCT_SKU_SELL_UNIT, { id, unit })
  },
  modifyProductSkuStock ({ commit }, { id, stock }) {
    commit(MODIFY_PRODUCT_SKU_STOCK, { id, stock })
  },
  modifyProductSkuSellState ({ commit }, { id, sellState }) {
    commit(MODIFY_PRODUCT_SKU_SELL_STATE, { id, sellState })
  },
  modifyProductSkuImage ({ commit }, { id, images }) {
    commit(MODIFY_PRODUCT_SKU_IMAGE, { id, images })
  },
  modifyProduct ({ commit, state, rootState }) {
    let data = JSON.parse(JSON.stringify(state.editData))
    if (data.frontendCategoryId) {
      data.frontend_categories = [ data.frontendCategoryId ]
    }
    delete data.frontendCategoryId
    if (!data.name) {
      delete data.name
    }
    if (!data.desc) {
      delete data.desc
    }

    data.skus.forEach(sku => {
      if (sku.images) {
        let images = []
        sku.images.forEach((data, index) => {
          if (!data.startsWith('http')) {
            images.push({
              number: index + 1,
              data
            })
          }
        })
        if (images.length > 0) {
          sku.images = images
        }
      }
    })

    editProduct({
      id: router.currentRoute.params.id,
      token: rootState.token,
      data
    })
      .then(res => {
        switch (res.code) {
          case 0:
            commit(MODIFY_PRODUCT_SUCCESS, { product: res.data })
            commit(ADD_MESSAGE, { text: '商品修改成功' })
            break
          case 1000:
            router.push({
              path: '/login',
              redirect: router.currentRoute.fullPath
            })
            throw new Error(res.message)
          default:
            throw new Error(res.message)
        }
      })
      .catch(err => {
        commit(MODIFY_PRODUCT_FAIL, { editMessage: err.message })
        commit(ADD_MESSAGE, { text: err.message, type: 'danger' })
      })
  },
  cancelProductModify ({ commit }) {
    router.push('/products')
    commit(CANCEL_PRODUCT_MODIFY)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

