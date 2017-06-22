<template>

<div>123</div>
</template>

<script>
export default {
  name: 'print',
  data () {
    return {
      orders: []
    }
  },
  created () {

  },
  methods: {
    print: function () {
      window.print()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subtable {
  background: #f4f4f4;
}
  .subtable th {
    padding-left: 10px;
  }
</style>
