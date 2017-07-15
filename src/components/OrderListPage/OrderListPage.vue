<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>订单管理<small>订单列表</small></h1>
    </section>
    <order-print-modal ref="printModal" :isShow="isShowPrintModal" :order="order"/>
    <section ref="content" class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">订单列表</h3>
              <div class="box-tools">
                <pagination class="pagination-sm no-margin pull-right" :lastPage="lastPage" :currentPage="currentPage"/>
                <div class="input-group input-group-sm" style="width: 200px">
                  <input class="form-control pull-right" type="text" placeholder="Search">
                  <div class="input-group-btn">
                    <button class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-body table-responsive no-padding">
              <table class="table">
                <thead>
                  <tr>
                    <th>订单编号</th>
                    <th>订单内容</th>
                    <th>下单时间</th>
                    <th>配送地址</th>
                    <th>订单状态</th>
                    <th>小计</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in list" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td style="width: 40%; font-size: 12px;">
                      <table class="table subtable">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>名称</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>小计</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="sku in order.skus" :key="sku.id">
                            <td>{{ sku.id }}</td>
                            <td>{{ sku.name }}</td>
                            <td>￥{{ sku.pivot.price / 100 }} / {{ sku.unit }}</td>
                            <td>{{ sku.pivot.quantity }}</td>
                            <td style="width: 20%;">￥{{ sku.pivot.price / 100 * sku.pivot.quantity }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td class="td-middle">{{ order.created_at }}</td>
                    <td class="td-middle" style="width: 20%;">{{ order.address.contact }}, {{ order.address.phone }}, {{ order.address.detail }}</td>
                    <td class="td-middle">{{ generateOrderState(order.state) }}</td>
                    <td class="td-middle"><button class="btn btn-link" @click="print(order)">打印</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script>
  import Pagination from '../Pagination'
  import { mapState, mapActions } from 'vuex'
  import OrderPrintModal from '../OrderPrintModal'
  export default {
    name: 'OrderListPage',
    data: () => ({
      words: '',
      order: null,
      isShowPrintModal: false
    }),
    computed: {
      key () {
        let query = this.$route.query
        return `${query.page || 1}#${query.words || ''}`
      },
      list () {
        return this.$store.state.order[this.key] && this.$store.state.order[this.key].data || []
      },
      lastPage () {
        return this.$store.state.order[this.key] && this.$store.state.order[this.key].last_page
      },
      currentPage () {
        return this.$store.state.order[this.key] && this.$store.state.order[this.key].current_page
      },
      ...mapState({
        isListGetting: state => state.order.isListGetting
      })
    },
    methods: {
      generateOrderState (state) {
        let text = ''
        switch (state) {
          case 1:
            text = '待付款'
            break
          case 2:
          case 3:
          case 5:
          case 6:
          case 9:
          case 10:
            text = '已取消'
            break
          case 4:
          case 8:
            text = '待配送'
            break
          default:
            text = '已完成'
        }
        return text
      },
      ...mapActions([
        'getOrderList'
      ]),
      getList () {
        let { page = 1, words = '' } = this.$route.query
        if (!this.$store.state.order[this.key] && !this.isListGetting) {
          this.getOrderList({ page, words })
        }
      },
      print (order) {
        let total = 0
        for (let sku of order.skus) {
          total += sku.pivot.price * sku.pivot.quantity
        }
        total /= 100
        this.order = { ...order, total }
        console.log(this.order)
        this.isShowPrintModal = true
        this.$refs.content.style.display = 'none'
        setTimeout(() => {
          window.print()
          this.isShowPrintModal = false
          this.$refs.content.style.display = 'block'
        })
      }
    },
    watch: {
      '$route': 'getList'
    },
    created () {
      this.words = this.$route.query.words || ''
      this.getList()
    },
    components: {
      Pagination, OrderPrintModal
    }
  }
</script>

<style>
  .td-middle {
    vertical-align: middle !important;
  }
</style>

