import axios from 'axios'
import host from './apiConfig.js'

export const getFrontendCategory = () => new Promise((resolve, reject) => {
  axios.get(`${host}/frontendcategory?fields=pid`)
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
