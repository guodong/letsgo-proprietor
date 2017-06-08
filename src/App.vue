<template>
    <router-view></router-view>

</template>
<script>
export default {
  name: 'app',
  created() {
    console.log(this.$http)
  }
}
</script>

<style>

</style>
