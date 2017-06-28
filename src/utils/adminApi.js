import axios from 'axios'
import host from './apiConfig.js'

export const getToken = (phone, password) => new Promise((resolve, reject) => {
  axios.post(`${host}/authentication`, {
    phone, password
  })
    .then(res => {
      let body = res.data
      // console.log('getToken', res)
      switch (body.code) {
        case 0:
          resolve(`Bearer {${body.data.token}}`)
          break
        default:
          reject(body.message)
      }
    })
    .catch(err => {
      reject(err.message)
    })
})
