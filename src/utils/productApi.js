import axios from 'axios'
import host from './apiConfig.js'

export const createProduct = ({ product, token }) => new Promise((resolve, reject) => {
  axios.post(`${host}/product`, product, {
    headers: { 'Authorization': token }
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
    .catch(err => reject(err.message))
})
