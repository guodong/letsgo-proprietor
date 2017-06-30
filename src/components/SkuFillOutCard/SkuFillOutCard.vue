<template>
  <box class="form-horizontal" :title="`单品 #${number + 1}: ${productName}${name ? `(${name})` : ''}`" :miniAble="true" :delAble="deleteAble" @deleteBox="deleteSku">
    <input-group type="text" labelText="名称" :labelSpan="2" :inputSpan="10" placeholder="名称" :initialValue="name" @input="inputName"/>
    <input-group v-for="(property, index) in properties" :isStatic="true" :labelText="property.name" :initialValue="property.value" :labelSpan="2" :inputSpan="10" :key="index"/>
    <input-group type="number" labelText="条码" :labelSpan="2" :inputSpan="10" placeholder="条形码" :initialValue="barcode" @input="inputBarcode"/>
    <input-group type="number" labelText="单价" :labelSpan="2" :inputSpan="10" placeholder="单价" frontAddon="¥" :initialValue="price" @input="inputPrice"/>
    <input-group type="text" labelText="单位" :labelSpan="2" :inputSpan="10" placeholder="单位" :frontAddon="price ? `¥${price} / ` : ''" :initialValue="unit" @input="inputUnit"/>
    <input-group type="number" labelText="库存" :labelSpan="2" :inputSpan="10" placeholder="库存" :initialValue="stock" @input="inputStock"/>
    <div class="form-group">
      <label class="col-sm-2 control-label">销售状态</label>
      <div class="col-sm-10">
        <div class="radio sale-state">
          <label><input :name="`sale_state_${number}`" type="radio" value="1" :checked="state" @change="checkState">上架</label>
          <label><input :name="`sale_state_${number}`" type="radio" value="0" :checked="!state" @change="checkState">下架</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">图片</label>
      <upload :initialImages="images" :drag="true" class="col-sm-10" @upload="uploadImage"/>
    </div>
  </box>
</template>

<script>
  import Box from '../Box'
  import InputGroup from '../InputGroup'
  import Upload from '../Upload'
  export default {
    name: 'SkuFillOutCard',
    props: {
      index: Number,
      number: Number,
      productName: String,
      name: String,
      barcode: String,
      properties: {
        type: Array,
        default: () => ([])
      },
      values: {
        type: Array,
        default: () => ([])
      },
      price: Number,
      unit: String,
      stock: Number,
      state: Number,
      images: Array,
      deleteAble: Boolean
    },
    methods: {
      inputName (name) {
        this.$emit('inputName', { index: this.index, name, values: this.values })
      },
      inputBarcode (barcode) {
        // console.log('input barcode', barcode)
        this.$emit('inputBarcode', { index: this.index, barcode, values: this.values })
      },
      inputPrice (price) {
        this.$emit('inputPrice', { index: this.index, price: Number(price), values: this.values })
      },
      inputUnit (unit) {
        this.$emit('inputUnit', { index: this.index, unit, values: this.values })
      },
      inputStock (stock) {
        this.$emit('inputStock', { index: this.index, stock: Number(stock), values: this.values })
      },
      checkState (event) {
        this.$emit('checkState', { index: this.index, sellState: Number(event.target.value), values: this.values })
      },
      uploadImage (images) {
        // console.log('upload image', images)
        this.$emit('uploadImage', { index: this.index, images, values: this.values })
      },
      deleteSku () {
        this.$emit('deleteSku', { index: this.index })
      }
    },
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
