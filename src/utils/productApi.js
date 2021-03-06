import axios from 'axios'
import host from './apiConfig.js'
import router from '../router/index.js'

export const createProduct = ({ product, token }) => new Promise((resolve, reject) => {
  axios.post(`${host}/product`, product, {
    headers: {
      'Authorization': token,
      'Content-type': 'application/json'
    }
  })
    .then(res => {
      switch (res.data.code) {
        case 0:
          resolve(res.data.data)
          break
        default:
          reject(res.data.message)
      }
    })
    .catch(err => {
      // console.log('err data', err.response)
      if (err.response.data) {
        reject(err.response.data.message)
        switch (err.response.data.code) {
          case 1000:
            router.push({
              path: '/login',
              query: {
                redirect: router.currentRoute.path
              }
            })
            break
        }
      } else {
        reject(err.message)
      }
    })
})

export const getProductList = ({ page, words, number = 10 }) => new Promise((resolve, reject) => {
  axios.get(`${host}/products`, {
    params: {
      words, page, number
    }
  })
    .then(res => {
      let body = res.data
      switch (body.code) {
        case 0:
          resolve(body.data)
          break
        default:
          reject(body.message)
      }
    })
    .catch(err => {
      let listGetMessage = err.response.data && err.response.data.message || err.message
      resolve(listGetMessage)
    })
})

export const editSku = ({ id, data, token }) => new Promise((resolve, reject) => {
  axios.put(`${host}/skus/${id}`, data, {
    headers: {
      'Authorization': token
    }
  })
    .then(res => {
      let body = res.data
      switch (body.code) {
        case 0:
          resolve(body.data)
          break
        default:
          reject(body.message)
      }
    })
    .catch(err => {
      if (err.response.data) {
        switch (err.response.data.code) {
          case 1000:
            router.push({
              path: '/login',
              query: {
                redirect: router.currentRoute.path
              }
            })
            break
        }
        reject(err.response.data.message)
      } else {
        reject(err.message)
      }
    })
})

export const getProduct = ({ id }) => new Promise((resolve, reject) => {
  axios.get(`${host}/products/${id}`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      if (err.response.data) {
        resolve(err.response.data)
      } else {
        reject(err)
      }
    })
})

export const editProduct = ({ token, id, data }) => new Promise((resolve, reject) => {
  axios.put(`${host}/products/${id}`, data, {
    headers: {
      'Authorization': token
    }
  })
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      if (err.response.data) {
        resolve(err.response.data)
      } else {
        reject(err)
      }
    })
})

