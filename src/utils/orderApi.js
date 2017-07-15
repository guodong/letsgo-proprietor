import axios from 'axios'
import host from './apiConfig.js'
import router from '../router'

export const getOrderList = ({ token, params }) => new Promise((resolve, reject) => {
  // console.log(token)
  axios.get(`${host}/orders`, {
    headers: {
      'Authorization': token
    },
    params: { page: 1, number: 10, ...params }
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
      let message = err.message
      if (err.response.data) {
        message = err.response.data.message
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
      }
      reject(message)
    })
})

export const getOrderInformation = ({ token }) => new Promise((resolve, reject) => {
  axios.get(`${host}/orders/information`, {
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
      let message = err.message
      if (err.response.data) {
        message = err.response.data.message
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
      }
      reject(message)
    })
})

