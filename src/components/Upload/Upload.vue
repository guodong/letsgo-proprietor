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
      drag: Boolean,
      images: {
        type: Array,
        default: () => ([])
      }
    },
    data: () => ({
      isUploading: false
    }),
    methods: {
      stopPropagation (event) {
        event.stopPropagation()
      },
      handleClick (number = null) {
        if (!this.disabled && !this.isUploading) {
          console.log('image number', number)
          this.isUploading = true
          let input = this.$refs.input
          let _this = this
          if (number !== null) {
            input.multiple = false
          } else {
            input.multiple = true
          }
          input.click()
          input.onchange = function (event) {
            let files = event.target.files
            _this.getBase64Content(files, number)
          }
        }
      },
      getBase64Content (files, number = null) {
        // console.log('get base64 content')
        // console.log(files)
        let _this = this
        this.isUploading = false
        let images = []
        if (number !== null) {
          console.log('initial images with props')
          images = [ ...this.images ]
        }
        console.log('images', images)
        let loop = files.length > 4 ? 4 : files.length - 1
        console.log('loop times', loop)
        for (let i = 0; i <= loop; i++) {
          let reader = new FileReader()
          reader.onload = () => {
            // console.log(number, reader.result)
            if (number === null) {
              // console.log('number === null')
              images.push(reader.result)
            } else {
              // console.log('image number', number)
              images.splice(number, 1, reader.result)
            }
            if (i === loop) {
              console.log('images will be emitted', images)
              _this.$emit('upload', [ ...images ])
            }
            // console.log(_this.images)
          }
          reader.readAsDataURL(files[i])
        }
      },
      deleteImage (number) {
        let images = [ ...this.images ]
        this.$emit('upload', images.splice(number, 1))
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
