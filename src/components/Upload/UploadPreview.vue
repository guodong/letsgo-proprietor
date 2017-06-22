<template>
  <ul class="upload-preview" @click="stopPropagation">
    <li class="upload-preview-item" v-for="(image, number) in images" :key="number">
      <div class="preview-image">
        <img class="image" v-bind:src="image">
      </div>
      <div class="preview-option">
        <button class="reupload" @click="reuploadImage(number)">重新上传</button>
        <button class="delete glyphicon glyphicon-remove
" @click="deleteImage(number)"></button>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'UploadPreview',
    data: () => ({
    }),
    props: {
      images: Array
    },
    methods: {
      stopPropagation (event) {
        event.stopPropagation()
      },
      reuploadImage (number) {
        // console.log('image number', number)
        this.$emit('reupload', number)
      },
      deleteImage (number) {
        // console.log('image number', number)
        this.$emit('delete', number)
      }
    }
  }
</script>

<style>
  .upload-preview {
    padding: 0;
    margin: 0;
    width: calc(100% - 30px);
    position: absolute;
    top: 0;
    left: 15px;
    right: 15px;
  }
  .upload-preview-item {
    list-style-type: none;
    display: inline-block;
    width: 20%;
    padding: 16px;
    position: relative;
  }
  .preview-image {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  .preview-image:before {
    content: "";
    padding-top: 100%;
    display: block;
  }
  .image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .upload-preview-item:hover .image {
    transform: scale(1.05, 1.05);
    filter: blur(8px);
  }
  .preview-option {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0.9);
    text-align: center;
    padding: calc((100% - 26px) / 2) 0;
  }
  .reupload {
    border: none;
    outline: none;
    border-radius: 3px;
    height: 26px;
    opacity: 0;
  }
  .upload-preview-item:hover .reupload {
    opacity: 1;
  }
  .delete {
    position: absolute;
    top: 26px;
    right: 26px;
    border: none;
    outline: none;
    border-radius: 4px;
    opacity: 0;
  }
  .upload-preview-item:hover .delete {
    opacity: 1;
  }
</style>
