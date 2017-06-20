<template>
  <div class="dragger" :class="{ 'is-dragover': dragover }" @dragover.prevent="onDragover" @dragleave.prevent="dragover = false" @drop.prevent="onDrop">
    <div class="notify-box">
      <i v-if="isShopPrompt" class="glyphicon glyphicon-cloud-upload upload-icon"></i>
      <p v-if="isShopPrompt" class="upload-text">Drop file here or <em>Click to upload</em></p>
    </div>
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
    min-height: 100px;
    cursor: pointer;
    overflow: hidden;
    background-color: #fff;
  }
  .dragger:before {
    content: "";
    padding-top: 20%;
    display: block;
  }
  .is-dragover {
    background-color: rgba(32, 159, 255, 0.06);
    border: 2px dashed #20a0ff;
  }
  .notify-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .upload-icon {
    font-size: 67px;
    color: #97a8be;
    margin: 4% 0;
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