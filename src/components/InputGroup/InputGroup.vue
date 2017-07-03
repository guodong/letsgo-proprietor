<template>
  <div class="form-group" :class="{'has-feedback': feedback}">
    <label v-if="labelText" :class="`control-label col-sm-${labelSpan}`">{{labelText}}</label>
    <div :class="`col-sm-${inputSpan}`">
      <div class="input-group" v-if="frontAddon || backAddon">
        <div class="input-group-addon" v-if="frontAddon">{{ frontAddon }}</div>
        <input v-if="!isStatic && type" :type="type" class="form-control" :placeholder="placeholder" :value="value" @input="handleInput">
        <div class="input-group-addon" v-if="backAddon">{{ backAddon }}</div>
      </div>
      <input v-else-if="!isStatic && type" :type="type" class="form-control" :placeholder="placeholder" :value="value" @input="handleInput">
      <textarea v-else-if="!isStatic" :value="value" @input="handleInput" class="form-control"></textarea>
      <span v-if="feedback" class="glyphicon form-control-feedback" :class="`glyphicon-${feedback}`"></span>
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
      value: [ String, Number ],
      isDisabled: Boolean,
      type: String,
      frontAddon: String,
      backAddon: String,
      feedback: String
    },
    methods: {
      handleInput (event) {
        // console.log('handle input', event.target.value)
        let _this = this
        setTimeout(() => {
          _this.$emit('input', event.target.value)
        }, 500)
      }
    }
  }
</script>
