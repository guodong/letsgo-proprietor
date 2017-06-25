<template>
  <div class="form-group">
    <label :class="`control-label col-sm-${labelSpan || 2}`">{{ labelText }}</label>
    <div :class="`col-sm-${inputSpan || 10}`">
      <div v-for="(option, index) in options" :key="index" class="checkbox pull-left checkbox">
        <label><input type="checkbox" :value="option.value">{{ option.text }}</label>
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
    }
  }
</script>

<style>
  .checkbox {
    min-width: 80px;
  }
</style>
