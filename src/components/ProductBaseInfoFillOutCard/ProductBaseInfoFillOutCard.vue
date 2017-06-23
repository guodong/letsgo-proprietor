<template>
  <box class="form-horizontal" title="商品信息" :miniAble="true">
    <div class="form-group">
      <label class="control-label col-sm-2">类别</label>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-4">
            <select class="form-control">
              <option value="1">选取一级分类</option>
              <option value="2">家用电器</option>
            </select>
          </div>
          <div class="col-sm-4">
            <select class="form-control">
              <option value="1">选取二级分类</option>
              <option value="2">家用电器</option>
            </select>
          </div>
          <div class="col-sm-4">
            <select class="form-control">
              <option value="1">选取二级分类</option>
              <option value="2">家用电器</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <input-group type="text" labelText="名称" :labelSpan="2" :inputSpan="10" placeholder="名称"/>
    <input-group labelText="描述" :labelSpan="2" :inputSpan="10" placeholder="描述"/>
    <div class="form-group">
      <label class="col-sm-2 control-label">属性</label>
      <div class="col-sm-10">
        <!-- <multiselect v-model="selProperties" @input="propChange" :options="properties" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="属性类型" label="name" track-by="name"></multiselect> -->
      </div>
    </div>
  </box>
</template>

<script>
  import Box from '../Box'
  import InputGroup from '../InputGroup'
  import Multiselect from 'vue-multiselect'
  export default {
    name: 'ProductBaseInfoFillOutCard',
    components: {
      Box, InputGroup, Multiselect
    }
  }
</script>
