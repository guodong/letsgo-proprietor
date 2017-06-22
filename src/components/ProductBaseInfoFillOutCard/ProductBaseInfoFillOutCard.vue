<template>
  <box class="form-horizontal" title="商品信息" :miniAble="true">
    <div class="form-group">
      <label class="control-label col-sm-2">类别</label>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-md-4">
            <select class="form-control">
              
            </select>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4"></div>
        </div>
      </div>
    </div>
    <input-group type="text" labelText="名称" :labelSpan="2" :inputSpan="10" placeholder="名称"/>
  </box>
</template>

<script>
  import Box from '../Box'
  import InputGroup from '../InputGroup'
  export default {
    name: 'ProductBaseInfoFillOutCard',
    components: {
      Box, InputGroup
    }
  }
</script>
