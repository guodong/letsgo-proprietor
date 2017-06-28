import {
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
  UPLOAD_SKU_IMAGE
} from '../mutation-type.js'

const skuInitial = { name: '', barcode: '', price: null, stock: null, unit: '', state: 1, values: [], images: [] }
const state = {
  category_id: null,
  name: '',
  desc: '',
  properties: [],
  // { name, barcode, price, stock, unit, state, values, images: [] }
  skus: []
}

const getters = {}

const mutations = {
  [SELECT_PRODUCT_FRONTEND_CATEGORY]: (state, { categoryId }) => {
    state.category_id = categoryId
  },
  [INPUT_PRODUCT_NAME]: (state, { name }) => {
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
  [UPLOAD_SKU_IMAGE]: (state, { index, number = null, data = '' }) => {
    let sku = state.skus[index]
    if (number === null) {
      sku.images.push(data)
    } else if (!data) {
      sku.images.splice(number, 1)
    } else {
      sku.images.splice(number, 1, data)
    }
  }
}

const actions = {
  selectCategory ({ commit }, payload) {
    commit(SELECT_PRODUCT_FRONTEND_CATEGORY, payload)
  },
  inputName ({ commit }, payload) {
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
