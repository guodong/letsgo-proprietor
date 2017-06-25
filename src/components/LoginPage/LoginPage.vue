<template>
  <div class="login-box">
    <div class="login-logo"><a href="#"><b>LETS</b>GO</a></div>
    <div class="login-box-body">
      <p class="login-box-msg">超市管理系统</p>
      <login-panel :phone="phone" :password="password" @inputPhone="inputPhone" @inputPassword="inputPassword" :isLogining="isTokenGetting" @login="submitLoginData"/>
    </div>
  </div>
</template>

<script>
  import LoginPanel from '../LoginPanel'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'LoginPage',
    computed: mapState([
      'phone', 'password', 'isTokenGetting'
    ]),
    methods: {
      ...mapActions([
        'inputPhone', 'inputPassword', 'submitLoginData'
      ])
    },
    components: {
      LoginPanel
    }
  }
</script>
