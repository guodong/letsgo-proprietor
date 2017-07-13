<template>
  <div class="wrapper" style="height: 100%;">
    <header-bar></header-bar>
    <navigation-bar></navigation-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeaderBar from '../HeaderBar'
  import NavigationBar from '../NavigationBar'
  export default {
    name: 'Layout',
    components: {
      HeaderBar, NavigationBar
    }
  }
</script>

