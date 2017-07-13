import axios from 'axios'
import host from './apiConfig.js'

export const getFrontendCategory = () => new Promise((resolve, reject) => {
  axios.get(`${host}/frontendcategory?fields=pid`)
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
      console.log(err)
      reject(err.message)
    })
})
