<template>
  <div class="login-box">
    <div class="login-logo"><a href="#"><b>LETS</b>GO</a></div>
    <div class="login-box-body">
      <p class="login-box-msg">超市管理系统</p>
      <login-panel/>
    </div>
  </div>
</template>

<script>
  import LoginPanel from '../LoginPanel'
  export default {
    name: 'LoginPage',
    components: {
      LoginPanel
    }
  }
</script>
