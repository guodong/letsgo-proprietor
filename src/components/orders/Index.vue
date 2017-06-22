<template>
  <div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      订单管理
      <small>订单列表</small>
    </h1>
  </section>
    <div v-if="printOrder" ref="print" style="display: none;">
      <h4 style="text-align: center;">订单详情</h4>
      <hr>
      <h5>订单号：{{printOrder.id}}</h5>
      <h5>下单时间：{{printOrder.created_at}}</h5>
      <table class="table table-hover" style="font-size: 9px;">
        <thead>
        <th>名称</th>
        <th>价格</th>
        <th>数量</th>
        <th>小计</th>
        </thead>
        <tbody>
        <tr v-for="sku in printOrder.skus">
          <td>{{sku.name}}</td>
          <td>¥{{sku.pivot.price}}/{{sku.unit}}</td>
          <td>{{sku.pivot.quantity}}</td>
          <td>¥{{sku.pivot.price * sku.pivot.quantity}}</td>
        </tr>
        </tbody>
        </table>
      <h5>总价：<div style="float: right;font-size: 18px;">¥{{printOrder.total}}</div></h5>

      <h5>收货人：{{printOrder.address.contact}}</h5>
      {{printOrder.address.detail}}
      <div style="font-size: 18px;">{{printOrder.address.phone}}</div>
    </div>
  <!-- Main content -->
  <section class="content" ref="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">订单列表</h3>
            <div class="box-tools">
              <ul class="pagination pagination-sm no-margin pull-right">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
              <div class="input-group input-group-sm" style="width: 150px;">
                <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                <div class="input-group-btn">
                  <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive no-padding">
            <table class="table">
              <thead>
              <tr>
                <th>ID</th>
                <th>订单内容</th>
                <th>下单时间</th>
                <th>地址信息</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="order in orders">
                <td>{{order.id}}</td>
                <td style="width: 40%;font-size: 10px;">
                  <table class="table table-hover subtable">
                    <thead>
                    <th>ID</th>
                    <th>名称</th>
                    <th>价格</th>
                    <th>数量</th>
                    <th>小计</th>
                    </thead>
                    <tbody>
                    <tr v-for="sku in order.skus">
                      <td>{{sku.id}}</td>
                      <td>{{sku.name}}</td>
                      <td>¥{{sku.pivot.price}}/{{sku.unit}}</td>
                      <td>{{sku.pivot.quantity}}</td>
                      <td>¥{{sku.pivot.price * sku.pivot.quantity}}</td>
                    </tr>
                    </tbody>
                  </table>
                </td>
                <td>{{order.created_at}}</td>
                <td style="width: 20%;">{{order.address.contact}}, {{order.address.phone}}, {{order.address.detail}}</td>
                <td>
                  <span v-if="order.state == 1" class="label label-default">未支付</span>
                  <span v-if="order.state == 2" class="label label-danger">用户取消</span>
                  <span v-if="order.state == 3" class="label label-warning">商家取消</span>
                  <span v-if="order.state == 4" class="label label-primary">配送中</span>
                  <span v-if="order.state == 5" class="label label-danger">已支付|用户取消</span>
                  <span v-if="order.state == 6" class="label label-danger">已支付|商家取消</span>
                  <span v-if="order.state == 7" class="label label-success">交易成功</span>
                </td>
                <td><a v-on:click="print(order)" href="javascript:;">打印</a></td>
              </tr>

              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
      </div>
    </div>

  </section>
  <!-- /.content -->
  </div>
</template>

<script>
import Print from './Print.vue'
import apiUrl from '../../utils/apiUtils.js'
export default {
  name: 'hello',
  components: {Print},
  data () {
    return {
      orders: [],
      printOrder: null
    }
  },
  created () {
    this.$http.get(`${apiUrl}/order`, {
      headers: {
        Authorization: `Bearer {${localStorage.getItem('token')}}`
      }
    })
    .then(resp => {
      this.orders = resp.body.data.data
      this.orders.forEach(function (ord) {
        var total = 0
        for (var i in ord.skus) {
          total += ord.skus[i].pivot.price * ord.skus[i].pivot.quantity
        }
        ord.total = total
      })
    }
    )
    .catch(err => {
      switch (err.body.code) {
        case 1000:
          this.$router.push('/auth')
          break
        default:
          console.log(err)
      }
    })
  },
  methods: {
    print: function (order) {
      this.printOrder = order
      setTimeout(() => {
        this.$refs.print.style.display = 'block'
        this.$refs.content.style.display = 'none'
        window.print()
        this.$refs.print.style.display = 'none'
        this.$refs.content.style.display = 'block'
        return false
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subtable {
  background: #f4f4f4;
}
  .subtable th {
    padding-left: 10px;
  }
</style>
