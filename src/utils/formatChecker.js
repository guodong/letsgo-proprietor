export const phoneReg = /^1[34578]{1}\d{9}$/
export const passwordReg = /^\w{6,20}$/

export const checkPhone = phone => phoneReg.test(phone)
export const checkPassword = password => passwordReg.test(password)
