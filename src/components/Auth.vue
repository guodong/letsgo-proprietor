<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html"><b>LETS</b>GO</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">超市管理系统</p>

      <form method="post" @submit.prevent="submit">
        <div class="form-group has-feedback">
          <input v-model="phone" type="text" class="form-control" placeholder="手机号">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input v-model="password" type="password" class="form-control" placeholder="密码">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="col-xs-4 col-xs-offset-8">
            <button  v-on:click="submit" type="button" class="btn btn-primary btn-block btn-flat">登 录</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

    </div>
    <!-- /.login-box-body -->
  </div>
</template>
<script>
  document.body.className = 'login-page'
  export default {
    name: 'hello',
    data () {
      return {
        phone: '',
        password: ''
      }
    },
    methods: {
      submit (event) {
        this.$http.post('http://api.letsgo.qfplan.com/authentication', {
          phone: this.phone,
          password: this.password
        }).then(response => {
          localStorage.setItem('token', response.body.data.token)
          this.$router.push('/')
        })
      }
    }
  }
</script>
