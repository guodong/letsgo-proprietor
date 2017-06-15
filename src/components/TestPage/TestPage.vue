<template>
  <div>
    <!-- <box></box> -->
    <!-- <info-box></info-box> -->
    <!-- <alerts></alerts> -->
    <modal></modal>
  </div>
</template>

<script>
  import Box from '../Box'
  import InfoBox from '../InfoBox'
  import Alerts from '../Alerts'
  import Modal from '../Modal'
  export default {
    data: () => ({
      message: 'Test Page'
    }),
    components: {
      Box, InfoBox, Alerts, Modal
    }
  }
</script>