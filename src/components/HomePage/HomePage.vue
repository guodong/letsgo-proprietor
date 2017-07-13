<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>总览<small>Version 0.0.0</small></h1>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <info-box class="bg-aqua" title="单品数量" icon="fa-th" number="123, 4" progress="60%" progressDesc="已上线 234 件"/>    
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <info-box class="bg-green" title="订单数量" icon="fa-list-alt" number="123, 4" progress="80%" progressDesc="未处理 123 单"/>    
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <info-box class="bg-yellow" title="用户数量" icon="fa-users" number="234, 9" progress="40%" progressDesc="回头客 1234 位"/>    
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <info-box class="bg-red" title="消息数量" icon="fa-envelope-o" number="123" progress="10%" progressDesc="未读消息 12 条"/>    
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import InfoBox from '../InfoBox'
  export default {
    name: 'HomePage',
    components: {
      InfoBox
    }
  }
</script>
