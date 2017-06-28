import axios from 'axios'
import host from './apiConfig.js'

export const getFrontendCategory = () => new Promise((resolve, reject) => {
  axios.get(`${host}/frontendcategory`)
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
      reject(err.message)
    })
})
