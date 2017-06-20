<template>
  <div class="upload" @click="handleClick()">
    <upload-dragger v-if="drag" @filechange="getBase64Content" v-bind:isShopPrompt="images.length == 0"></upload-dragger>
    <upload-preview @reupload="handleClick" v-bind:images="images" @delete="deleteImage"></upload-preview>
    <input type="file" ref="input" class="upload-input" accept="image/*" @click="stopPropagation">
  </div>
</template>

<script>
  import UploadDragger from './UploadDragger.vue'
  import UploadPreview from './UploadPreview.vue'
  export default {
    name: 'Upload',
    props: {
      disabled: Boolean,
      drag: Boolean
    },
    data: () => ({
      images: []
    }),
    methods: {
      stopPropagation(event) {
        event.stopPropagation()
      },
      handleClick(number = null) {
        console.log('number', number)
        if (!this.disabled) {
          let input = this.$refs.input
          let _this = this
          if (number !== null) {
            input.multiple = false
          } else {
            input.multiple = true
          }
          input.click()
          input.onchange = function(event) {
            let files = event.target.files
            _this.getBase64Content(files, number)
          }
        }
      },
      getBase64Content(files, number = null) {
        // console.log('get base64 content')
        // console.log(files)
        let _this = this
        if (number === null) {
          _this.images = []
        }
        for (let i = 0; i < files.length; i++) {
          if (i > 4) {
            break
          }
          let reader = new FileReader()
          reader.onload = () => {
            // console.log(number, reader.result)
            if (number === null) {
              // console.log('number === null')
              _this.images.push(reader.result)
            } else {
              // console.log('image number', number)
              _this.images = [
                ..._this.images.slice(0, number),
                reader.result,
                ..._this.images.slice(number + 1)
              ]
            }
            // console.log(_this.images)
          }
          reader.readAsDataURL(files[i])
        }
      },
      deleteImage(number) {
        this.images = [
          ...this.images.slice(0, number),
          ...this.images.slice(number + 1)
        ]
      }
    },
    components: {
      UploadDragger, UploadPreview
    }
  }
</script>

<style>
  .upload {
    position: relative;
    /*padding: 0 1px;*/
  }
  .upload-input {
    display: none !important;
  }
</style>