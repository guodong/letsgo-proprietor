<template>
  <div>
    <!-- <box></box> -->
    <!-- <info-box></info-box> -->
    <!-- <alerts></alerts> -->
    <!-- <modal></modal> -->
    <!-- <upload drag="drag"></upload> -->
    <sku-fill-out-card></sku-fill-out-card>
    <!-- <input-group labelText="名称" helpText="名称错误" :labelSpan="2" :inputSpan="6" placeholder="名称" v-model="input"></input-group> -->
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
  export default {
    data: () => ({
      message: 'Test Page',
      drag: true,
      input: 'Name'
    }),
    components: {
      Box, InfoBox, Alerts, Modal, Upload, SkuFillOutCard, InputGroup
    }
  }
</script>