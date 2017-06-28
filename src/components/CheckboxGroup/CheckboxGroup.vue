<template>
  <div class="form-group">
    <label :class="`control-label col-sm-${labelSpan || 2}`">{{ labelText }}</label>
    <div :class="`col-sm-${inputSpan || 10}`">
      <div v-for="(option, index) in options" :key="index" class="checkbox pull-left checkbox">
        <label><input type="checkbox" :value="option.value" @change="select" :checked="option.checked">{{ option.text }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxGroup',
    props: {
      labelSpan: Number,
      inputSpan: Number,
      options: Array,
      labelText: String
    },
    methods: {
      select (event) {
        // let properties = this.$store.state.product.properties
        // let value
        // for (let property of properties) {
        //   value = property.values.find(v => v.id === Number(event.target.value))
        //   if (value) {
        //     break
        //   }
        // }
        // console.log('value before handle', value.checked)
        // console.log('handle check', event.target.value, event.target.checked)
        this.$emit('handleCheck', event.target.value, event.target.checked)
        // console.log('value after handle', value.checked)
      }
    }
  }
</script>

<style>
  .checkbox {
    min-width: 80px;
  }
</style>
