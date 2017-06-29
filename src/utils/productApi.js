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
