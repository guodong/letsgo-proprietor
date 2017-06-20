<template>
  <box class="form-horizontal" title="单品#1: 小米拖线板（黑色绚烂版）" :miniAble="true" :delAble="true">
    <input-group type="text" labelText="名称" :labelSpan="2" :inputSpan="10" placeholder="名称"/>
    <input-group type="text" labelText="描述" :labelSpan="2" :inputSpan="10" placeholder="条形码"/>
    <input-group type="number" labelText="单价" :labelSpan="2" :inputSpan="10" placeholder="单价" frontAddon="¥"/>
    <input-group type="text" labelText="单位" :labelSpan="2" :inputSpan="10" placeholder="单位"/>
    <input-group type="number" labelText="库存" :labelSpan="2" :inputSpan="10" placeholder="库存"/>
    <div class="form-group">
      <label class="col-sm-2 control-label">销售状态</label>
      <div class="col-sm-10">
        <div class="radio sale-state">
          <label><input name="sale_state" type="radio" value="1">上架</label>
          <label><input name="sale_state" type="radio" value="0">下架</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">图片</label>
      <upload :drag="true" class="col-sm-10"/>
    </div>
  </box>
</template>

<script>
  import Box from '../Box'
  import InputGroup from '../InputGroup'
  import Upload from '../Upload'
  export default {
    name: 'SkuFillOutCard',
    props: {},
    data: () => ({}),
    components: {
      Box, InputGroup, Upload
    }
  }
</script>

<style>
  .sale-state > label {
    margin-right: 20px;
  }
</style>