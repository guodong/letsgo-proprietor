<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>商品管理<small>商品列表</small></h1>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">商品列表</h3>
              <div class="box-tools">
                <pagination class="pagination-sm no-margin pull-right" :lastPage="lastPage" :currentPage="currentPage" :query="urlQuery"/>
                <div class="input-group input-group-sm" style="width: 200px">
                  <input class="form-control pull-right" type="text" placeholder="Search" v-model="words" @keypress.enter="search"/>
                  <div class="input-group-btn">
                    <button class="btn btn-default" @click="search"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-body table-responsive no-padding">
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>单品</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in list">
                    <td style="width: 6%;">{{ product.id }}</td>
                    <td style="vertical-align: middle; width: 24%;"><router-link to="#">{{ product.name }}</router-link></td>
                    <td style="width: 70%;">
                      <table class="table table-hover subtable">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>名称</th>
                            <th>价格</th>
                            <th>库存</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="sku in product.skus">
                            <td style="width: 10%;">{{ sku.id }}</td>
                            <td style="width: 30%;">{{ sku.name }}</td>
                            <td style="width: 30%;">￥{{ sku.price / 100 }} / {{ sku.unit }}</td>
                            <td style="width: 10%;">{{ sku.stock }}</td>
                            <td style="width: 20%;"><button class="btn btn-xs btn-link">{{ sku.state === 1 ? '下' : '上' }}架</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
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
  import { mapActions, mapState } from 'vuex'
  import Pagination from '../Pagination'
  export default {
    name: 'ProductListPage',
    data: () => ({
      words: ''
    }),
    computed: {
      key () {
        let { page = 1, words = '' } = this.$route.query
        return `${page}#${words}`
      },
      list () {
        // let list = this.$store.state.product[this.key] && this.$store.state.product[this.key].data || []
        // console.log('product list', list)
        return this.$store.state.product[this.key] && this.$store.state.product[this.key].data || []
      },
      total () {
        return this.$store.state.product[this.key] && this.$store.state.product[this.key].total
      },
      currentPage () {
        return this.$store.state.product[this.key] && this.$store.state.product[this.key].current_page
      },
      lastPage () {
        return this.$store.state.product[this.key] && this.$store.state.product[this.key].last_page
      },
      ...mapState({
        isListGetting: state => state.product.isListGetting
      }),
      urlQuery () {
        // let query = { ...this.$route.query }
        return { ...this.$route.query }
      }
    },
    methods: {
      ...mapActions([
        'getProductList'
      ]),
      getList () {
        if (!this.$store.state.product[this.key] && !this.isListGetting) {
          let { page = 1, words = '' } = this.$route.query
          this.getProductList({ page, words })
        }
      },
      search () {
        this.$router.push({ path: this.$route.path, query: { words: this.words } })
      }
    },
    created () {
      this.getList()
    },
    watch: {
      '$route': 'getList'
    },
    components: {
      Pagination
    }
  }
</script>

