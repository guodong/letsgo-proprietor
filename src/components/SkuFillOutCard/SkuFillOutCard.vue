<template>
  <box
    class="form-horizontal"
    :title="`单品 #${number + 1}: ${productName}${name ? `(${name})` : ''}`"
    :miniAble="true"
    :delAble="deleteAble"
    @deleteBox="deleteSku"
  >
    <input-group
      type="text"
      labelText="名称"
      :labelSpan="2"
      :inputSpan="10"
      placeholder="名称"
      :value="name"
      @input="inputName"
    />
    <input-group
      v-for="(property, index) in properties"
      :isStatic="true"
      :labelText="property.name"
      :value="property.value"
      :labelSpan="2"
      :inputSpan="10"
      :key="index"
    />
    <input-group
      type="number"
      labelText="条码"
      :labelSpan="2"
      :inputSpan="10"
      placeholder="条形码"
      :value="barcode"
      @input="inputBarcode"
    />
    <input-group
      type="number"
      labelText="单价"
      :labelSpan="2"
      :inputSpan="10"
      placeholder="单价"
      frontAddon="¥"
      :value="price"
      @input="inputPrice"
    />
    <input-group
      type="text"
      labelText="单位"
      :labelSpan="2"
      :inputSpan="10"
      placeholder="单位"
      :frontAddon="price ? `¥${price} / ` : ''"
      :value="unit"
      @input="inputUnit"
    />
    <input-group
      type="number"
      labelText="库存"
      :labelSpan="2"
      :inputSpan="10"
      placeholder="库存"
      :value="stock"
      @input="inputStock"
    />
    <div class="form-group">
      <label class="col-sm-2 control-label">销售状态</label>
      <div class="col-sm-10">
        <div class="radio sale-state">
          <label>
            <input
              :name="`sale_state_${number}`"
              type="radio"
              value="1"
              :checked="state === 1"
              @change="checkState"
            />
            上架
          </label>
          <label>
            <input
              :name="`sale_state_${number}`"
              type="radio"
              value="2"
              :checked="state === 2"
              @change="checkState"
            />
            下架
          </label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">图片</label>
      <upload :images="images" :drag="true" class="col-sm-10" @upload="uploadImage"/>
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
      number: Number,
      productName: String,
      name: String,
      barcode: String,
      properties: {
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
        // console.log('input name', name)
        // console.log(this.inputName)
        this.$emit('inputName', name)
      },
      inputBarcode (barcode) {
        // console.log('input barcode', barcode)
        this.$emit('inputBarcode', barcode)
      },
      inputPrice (price) {
        this.$emit('inputPrice', Number(price))
      },
      inputUnit (unit) {
        this.$emit('inputUnit', unit)
      },
      inputStock (stock) {
        this.$emit('inputStock', Number(stock))
      },
      checkState (event) {
        this.$emit('checkState', Number(event.target.value))
      },
      uploadImage (images) {
        // console.log('upload image', images)
        this.$emit('uploadImage', images)
      },
      deleteSku () {
        this.$emit('deleteSku')
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
