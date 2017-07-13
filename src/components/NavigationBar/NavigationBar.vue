<template>
  <aside class="main-sidebar">
    <section class="sidebar">
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
          <ul class="treeview-menu">
            <li><router-link to="/products"><i class="fa fa-circle-o"></i> 商品列表</router-link></li>
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
  </aside>
</template>

<script>
  export default {
    name: 'NavigationBar'
  }
</script>
