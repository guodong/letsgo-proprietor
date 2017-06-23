<template>
  <div>
    <input-group type="text" placeholder="手机号" feedback="user"/>
    <input-group type="password" placeholder="密码" feedback="lock"/>
    <button class="btn btn-primary btn-block">登录</button>
  </div>
</template>

<script>
  import InputGroup from '../InputGroup'
  export default {
    name: 'LoginPanel',
    components: {
      InputGroup
    }
  }
</script>
