<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">{{title}}</h3>
      <!-- right icon -->
      <!-- <span class="label label-primary pull-right"><i class="fa fa-html5"></i></span> -->

      <!-- with tools -->
      <div class="box-tools pull-right">
        <!-- collapsable -->
        <button class="btn btn-box-tool" v-if="miniAble" data-widget="collapse"><i class="fa fa-minus"></i></button>

        <!-- removable -->
        <button class="btn btn-box-tool" v-if="delAble" data-widget="remove"><i class="fa fa-times"></i></button>

        <!-- collapsable and removable -->
        <!-- <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button> -->
        <!-- <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button> -->
      </div>

    </div>
    <div class="box-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Box',
    props: {
      title: String,
      miniAble: Boolean,
      delAble: Boolean
    }
  }
</script>

<style>
</style>