<template>
<div class="content-wrapper">
  <header class="content-header">
    <h1><small>修改商品</small></h1>
  </header>
  <main class="content">
    <div class="row">
      <div class="col-xs-12">
        <product-base-info-fill-out-card :isShowPropertySelector="false" :frontendCategories="frontendCategories" :categoryId="product && product.frontendcategories[0].id" :name="product && product.name" :desc="product && product.desc"/>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <sku-fill-out-card/>
      </div>
    </div>
  </main>
</div>
</template>

<script>
  import ProductBaseInfoFillOutCard from '../ProductBaseInfoFillOutCard'
  import SkuFillOutCard from '../SkuFillOutCard'
  import { mapState, mapActions } from 'vuex'
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
        console.log('product:', this.$store.state.product.list.find(v => v.id === Number(this.id)))
        return this.$store.state.product.list.find(v => v.id === Number(this.id))
      }
    },
    methods: {
      ...mapActions(['getProperty', 'getFrontendCategory', 'getProduct'])
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
    components: {
      ProductBaseInfoFillOutCard,
      SkuFillOutCard
    }
  }
</script>

