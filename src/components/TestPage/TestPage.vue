<template>
  <div>
    <!-- <box></box> -->
    <!-- <info-box></info-box> -->
    <!-- <alerts></alerts> -->
    <!-- <modal></modal> -->
    <upload drag="drag"></upload>
    <!-- <sku-fill-out-card></sku-fill-out-card> -->
  </div>
</template>

<script>
  import Box from '../Box'
  import InfoBox from '../InfoBox'
  import Alerts from '../Alerts'
  import Modal from '../Modal'
  import Upload from '../Upload'
  import SkuFillOutCard from '../SkuFillOutCard'
  export default {
    data: () => ({
      message: 'Test Page',
      drag: true
    }),
    components: {
      Box, InfoBox, Alerts, Modal, Upload, SkuFillOutCard
    }
  }
</script>