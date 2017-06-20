<template>
  <div class="form-group">
    <label :class="`control-label col-sm-${labelSpan}`">{{labelText}}</label>
    <div :class="`col-sm-${inputSpan}`">
      <div class="input-group" v-if="frontAddon || backAddon">
        <div class="input-group-addon" v-if="frontAddon">{{ frontAddon }}</div>
        <input v-if="!isStatic && type" :type="type" class="form-control" :placeholder="placeholder" :value="value" @input="handleInput">
        <div class="input-group-addon" v-if="backAddon">{{ backAddon }}</div>
      </div>
      <input v-else-if="!isStatic && type" :type="type" class="form-control" :placeholder="placeholder" :value="value" @input="handleInput">
      <textarea :value="value" @input="handleInput" v-else></textarea>
      <span v-if="helpText" class="help-block">{{helpText}}</span>
      <p v-if="isStatic" class="form-control-static">{{value}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputGroup',
    props: {
      labelText: String,
      helpText: String,
      labelSpan: Number,
      inputSpan: Number,
      placeholder: String,
      isStatic: Boolean,
      value: String,
      isDisabled: Boolean,
      type: String,
      frontAddon: String,
      backAddon: String
    },
    methods: {
      handleInput(event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>