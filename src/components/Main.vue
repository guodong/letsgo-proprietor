<template>
  <div class="wrapper" style="height: 100%;">

    <header class="main-header">
      <!-- Logo -->
      <a href="main.html" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>L</b>G</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>LETS</b>GO</span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>

      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">

        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
          <li class="header">MAIN NAVIGATION</li>
          <li class="active">
            <router-link to="/">
              <i class="fa fa-dashboard"></i> <span>总览</span>
            </router-link>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-table"></i> <span>商品管理</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>

            </a>
            <ul class="treeview-menu">
              <li><router-link to="/products/list"><i class="fa fa-circle-o"></i> 商品列表</router-link></li>
              <li><router-link to="/product/create"><i class="fa fa-circle-o"></i> 新增商品</router-link></li>
            </ul>
          </li>
          <li class="">
            <router-link to="/orders/list">
              <i class="fa fa-files-o"></i> <span>订单管理</span>
            <span class="pull-right-container">
              <small class="label pull-right bg-green">150</small>
            </span>
            </router-link>
          </li>
          <li>
            <a v-on:click="logout()" href="javascript:;">
              <i class="glyphicon glyphicon-export"></i> <span>退出</span>
            </a>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <router-view></router-view>
    <!-- Content Wrapper. Contains page content -->

  </div>

</template>
<script>
export default {
  name: 'main',
  activated () {
    this.$router.push('/overview')
  },
  methods: {
    logout: function () {
      localStorage.removeItem('token')
      this.$router.push('/auth')
    }
  }
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100% !important;
    min-height: 100% !important;
    font-family: -apple-system,BlinkMacSystemFont,Neue Haas Grotesk Text Pro,Arial Nova,Segoe UI,Helvetica Neue,\.PingFang SC,PingFang SC,Microsoft YaHei,Microsoft JhengHei,Source Han Sans SC,Noto Sans CJK SC,Source Han Sans CN,Noto Sans SC,Source Han Sans TC,Noto Sans CJK TC,Hiragino Sans GB,sans-serif;
    /*font-size: 12px;*/
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;
  }
  * {
    box-sizing: border-box;
  }
  .wrapper {
    height: 100% !important;
  }
</style>
