<template>
<div v-if="order" :style="`display: ${isShow ? 'block' : 'none'};`">
  <h4 style="text-align: center;">订单编号: {{ order.code }}</h4>
    <table class="table table-hover" style="font-size: 9px;">
      <thead>
        <tr>
          <th>名称</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sku in order.skus">
          <td>{{ sku.product.name }}({{ sku.name }})</td>
          <td>{{ sku.pivot.price / 100 }}</td>
          <td>{{ sku.pivot.quantity }}</td>
          <td>{{ sku.pivot.price * sku.pivot.quantity / 100 }}</td>
        </tr>
      </tbody>
    </table>
    <div>总价: <big class="pull-right">￥{{ order.total }}</big></div>
    <div>备注: {{ order.remark }}</div>
    <div>{{ order.address.detail }}</div>
    <div>{{ order.address.phone }} ({{ order.address.contact }} 收)</div>
  </div>
</template>

<script>
  export default {
    name: 'OrderPrintModal',
    props: {
      order: Object,
      isShow: Boolean
    }
  }
</script>

