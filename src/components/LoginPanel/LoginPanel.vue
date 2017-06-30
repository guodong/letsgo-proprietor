<template>
  <div>
    <input-group type="text" placeholder="手机号" feedback="user" :initialValue="phone" @input="inputPhone"/>
    <input-group type="password" placeholder="密码" feedback="lock" :initialValue="password" @input="inputPassword"/>
    <button @click="login" class="btn btn-primary btn-block">{{ isLogining ? '登录中……' : '登录' }}</button>
  </div>
</template>

<script>
  import InputGroup from '../InputGroup'
  export default {
    name: 'LoginPanel',
    props: {
      phone: String,
      password: String,
      isLogining: Boolean
    },
    methods: {
      inputPhone (phone) {
        this.$emit('inputPhone', { phone })
      },
      inputPassword (password) {
        this.$emit('inputPassword', { password })
      },
      login () {
        this.$emit('login')
      }
    },
    components: {
      InputGroup
    }
  }
</script>
