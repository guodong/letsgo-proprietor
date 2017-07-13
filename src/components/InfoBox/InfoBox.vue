<template>
  <div class="info-box">
    <span class="info-box-icon"><i class="fa" :class="icon"></i></span>
    <div class="info-box-content">
      <span class="info-box-text">{{ title }}</span>
      <span class="info-box-number">{{ number }}</span>
      <div class="progress">
        <div class="progress-bar" :style="`width: ${progress}`"></div>
      </div>
      <span class="progress-description">{{ progressDesc }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InfoBox',
    props: {
      icon: String,
      title: String,
      number: String,
      progress: String,
      progressDesc: String
    }
  }
</script>
