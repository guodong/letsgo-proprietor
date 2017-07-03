<template>
  <div>
    <!-- <box></box> -->
    <!-- <info-box></info-box> -->
    <!-- <alerts></alerts> -->
    <!-- <modal></modal> -->
    <!-- <upload drag="drag"></upload> -->
    <!-- <sku-fill-out-card></sku-fill-out-card> -->
    <input-group type="text" labelText="名称" helpText="名称错误" :labelSpan="2" :inputSpan="6" placeholder="名称" v-model="input"></input-group>
    <!-- <product-base-info-fill-out-card :properties="properties" :propertyOptions="propertyOptions" @inputProperty="inputProperty"/> -->
    <!-- <message/> -->
  </div>
</template>

<script>
  import Box from '../Box'
  import InfoBox from '../InfoBox'
  import Alerts from '../Alerts'
  import Modal from '../Modal'
  import Upload from '../Upload'
  import SkuFillOutCard from '../SkuFillOutCard'
  import InputGroup from '../InputGroup'
  import ProductBaseInfoFillOutCard from '../ProductBaseInfoFillOutCard'
  import Message from '../Message'
  export default {
    data: () => ({
      message: 'Test Page',
      drag: true,
      input: 'Name',
      properties: [],
      propertyOptions: ['颜色', '屏幕尺寸', '口味', '包装规格', '款式']
    }),
    methods: {
      inputProperty (value) {
        this.properties = value
      }
    },
    components: {
      Box,
      InfoBox,
      Alerts,
      Modal,
      Upload,
      SkuFillOutCard,
      InputGroup,
      ProductBaseInfoFillOutCard,
      Message
    }
  }
</script>
