<template>
  <div class="info-box bg-yellow">
    <span class="info-box-icon bg-aqua"><i class="fa fa-envelope-o"></i></span>
    <div class="info-box-content">
      <span class="info-box-text">Message</span>
      <span class="info-box-number">4, 140</span>
      <div class="progress">
        <div class="progress-bar" style="width: 70%"></div>
      </div>
      <span class="progress-description">70% Increase in 30 Days</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InfoBox',
  }
</script>