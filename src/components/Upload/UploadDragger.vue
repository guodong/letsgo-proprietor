<template>
  <div class="dragger" :class="{ 'is-dragover': dragover }" @dragover.prevent="onDragover" @dragleave.prevent="dragover = false" @drop.prevent="onDrop">
    <i v-if="isShopPrompt" class="glyphicon glyphicon-cloud-upload upload-icon"></i>
    <p v-if="isShopPrompt" class="upload-text">Drop file here or <em>Click to upload</em></p>
  </div>
</template>

<script>
  export default {
    name: 'UploadDragger',
    props: {
      disabled: Boolean,
      isShopPrompt: Boolean
    },
    data: () => ({
      dragover: false
    }),
    methods: {
      onDragover() {
        if (!this.disabled) {
          this.dragover = true
        }
      },
      onDrop(event) {
        if (!this.disabled) {
          this.dragover = false
          this.$emit('filechange', event.dataTransfer.files)
        }
      }
    }
  }
</script>

<style>
  .dragger {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100%;
    height: 180px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    background-color: #fff;
  }
  .is-dragover {
    background-color: rgba(32, 159, 255, 0.06);
    border: 2px dashed #20a0ff;
  }
  .upload-icon {
    font-size: 67px;
    color: #97a8be;
    margin: 40px 0 16px;
    line-height: 50px;
  }
  .upload-text {
    color: #97a8be;
    font-size: 14px;
    text-align: center;
  }
  .upload-text > em {
    color: #20a0ff;
    font-style: normal;
  }
</style>