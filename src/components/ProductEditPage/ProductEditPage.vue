<template>
<div class="content-wrapper">
  <header class="content-header">
    <h1><small>修改商品</small></h1>
  </header>
  <main class="content">
    <div class="row">
      <div class="col-xs-12">
        <product-base-info-fill-out-card :isShowPropertySelector="false"
          :frontendCategories="frontendCategories"
          :categoryId="frontendCategoryId"
          :name="name" :desc="desc"
          @selectCategory="modifyProductFrontendCategory"
          @inputName="modifyProductName"
          @inputDescription="modifyProductDescription" />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <sku-fill-out-card v-for="(sku, number) in skus" :key="sku.id" :number="number" :productName="name" :name="sku.name" :barcode="sku.barcode" :price="sku.price / 100" :unit="sku.unit" :stock="sku.stock" :state="sku.state" :images="sku.images" @inputName="name => { modifyProductSkuName({ id: sku.id, name })}" @inputBarcode="barcode => { modifyProductSkuBarcode({ id: sku.id, barcode })}" @inputPrice="price => { modifyProductSkuPrice({ id: sku.id, price: parseInt(price * 100)})}" @inputUnit="unit => { modifyProductSkuSellUnit({ id: sku.id, unit })}" @inputStock="stock => { modifyProductSkuStock({ id: sku.id, stock: parseInt(stock) })}" @checkState="sellState => { modifyProductSkuSellState({ id: sku.id, sellState })}" @uploadImage="images => { modifyProductSkuImage({ id: sku.id, images })}"/>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-offset-8 col-xs-2">
        <button @click="cancelProductModify" class="btn full-width btn-block">取消</button>
      </div>
      <div class="col-xs-2">
        <button @click="modifyProduct" :disabled="isEditing" class="btn btn-info full-width btn-block">修改{{ isEditing ? '中……' : '' }}</button>
      </div>
    </div>
  </main>
</div>
</template>

<script>
  import ProductBaseInfoFillOutCard from '../ProductBaseInfoFillOutCard'
  import SkuFillOutCard from '../SkuFillOutCard'
  import { mapState, mapActions } from 'vuex'
  import { imageHost } from '../../utils/apiConfig'

  // console.log('product edit page')
  export default {
    name: 'ProductEditPage',
    computed: {
      id () {
        return this.$route.params.id
      },
      ...mapState({
        isEditing: state => state.product.isEditing,
        data: state => state.product.editData,
        isFrontendCategoryGetting: state => state.category.isFrontGetting,
        frontendCategories: state => state.category.front,
        isPropertyGetting: state => state.property.isPropertyGetting,
        properties: state => state.property.properties,
        isProductGetting: state => state.product.isGetting
      }),
      product () {
        // console.log(typeof this.id, this.id)
        // console.log('product:', this.$store.state.product.list.find(v => v.id === Number(this.id)))
        return this.$store.state.product.list.find(v => v.id === Number(this.id))
      },
      frontendCategoryId () {
        // console.log('product', this.product)
        let id = this.data.frontendCategoryId || this.product && this.product.frontendcategories[0].id
        // console.log(id)
        return id
      },
      name () {
        return this.data.name || this.product && this.product.name
      },
      desc () {
        return this.data.desc || this.product && this.product.desc
      },
      skus () {
        let skus = []
        if (this.product) {
          for (let sku of this.product.skus) {
            let images = sku.images.map(v => imageHost + v.path)
            let skuData = this.data.skus.find(v => v.id === sku.id) || {}
            // console.log('sku data', skuData)
            skus.push({ ...sku, images, ...skuData })
          }
        }
        skus.sort((curr, next) => curr.id > next.id)
        return skus
      }
    },
    methods: {
      ...mapActions([
        'getProperty',
        'getFrontendCategory',
        'getProduct',
        'modifyProductFrontendCategory',
        'modifyProductName',
        'modifyProductDescription',
        'modifyProductSkuName',
        'modifyProductSkuBarcode',
        'modifyProductSkuPrice',
        'modifyProductSkuSellUnit',
        'modifyProductSkuStock',
        'modifyProductSkuSellState',
        'modifyProductSkuImage',
        'modifyProduct',
        'cancelProductModify'
      ])
    },
    created () {
      // console.log(this.properties, this.properties.length)
      // if (this.properties.length === 0 && !this.isPropertyGetting) {
      //   console.log('get property now')
      //   this.getProperty()
      // }

      // console.log('fonrtend categories', this.frontendCategories)
      if (this.frontendCategories.length === 0 && !this.isFrontendCategoryGetting) {
        // console.log('get frontend category')
        this.getFrontendCategory()
      }

      if (!this.product && !this.isProductGetting) {
        this.getProduct({ id: this.id })
      }
    },
    // beforeRouteEnter (to, from, next) {
    //
    // },
    components: {
      ProductBaseInfoFillOutCard,
      SkuFillOutCard
    }
  }
</script>

