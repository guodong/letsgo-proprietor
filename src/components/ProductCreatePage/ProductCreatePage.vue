<template>
  <div class="content-wrapper">
    <header class="content-header">
      <h1>商品管理<small>添加商品</small></h1>
    </header>
    <main class="content">
      <div class="row">
        <div class="col-xs-12">
          <product-base-info-fill-out-card :frontendCategories="frontendCategories" :categoryId="categoryId" @selectCategory="selectCategory" @inputName="inputName" @inputDescription="inputDescription" :name="name" :desc="desc" :properties="properties" :propertyOptions="propertyOptions" @selectProperty="selectProperty" @checkValue="checkValue"/>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <sku-fill-out-card class="box-warning" v-for="(sku, number) in skuData" :properties="sku.properties" :name="sku.name" @inputName="name => {inputSkuName({ index: sku.index, name, values: sku.values })}" :barcode="sku.barcode" @inputBarcode="barcode => { inputSkuBarcode({ index: sku.index, barcode, values: sku.values })}" :price="sku.price" @inputPrice="price => { inputSkuPrice({ index: sku.index, price, values: sku.values })}" :unit="sku.unit" @inputUnit="unit => { inputSkuSellUnit({ index: sku.index, unit, values: sku.values })}" :stock="sku.stock" @inputStock="stock => { inputSkuStock({ index: sku.index, stock, values: sku.values })}" :state="sku.state" @checkState="sellState => { checkSkuSellState({ index: sku.index, sellState, values: sku.values })}" @uploadImage="images => { uploadSkuImage({ index: sku.index, images, values: sku.values })}" :key="number" :number="number" :productName="name" @deleteSku="deleteSku({ index: sku.index })" :deleteAble="skuData.length > 1" :images="sku.images"/>
        </div>
      </div>
      <button class="btn btn-success btn-block" @click="createProduct" :disabled="isCreating">发布{{ isCreating ? '中……' : '商品'}}</button>
    </main>
  </div>
</template>

<script>
import ProductBaseInfoFillOutCard from '../ProductBaseInfoFillOutCard'
import SkuFillOutCard from '../SkuFillOutCard'
import { mapState, mapActions } from 'vuex'
const getValuesCombination = properties => {
  properties = properties.filter(property => property.values.find(value => value.checked))
  if (!properties.length) {
    return []
  }
  // console.log('properties', properties)
  let result = []
  let tmp = []
  let n = 0
  let getResult = n => {
    for (let i = 0; i < properties[n].values.length; i++) {
      let value = properties[n].values[i]
      // console.log('n =', n, ', i =', i, ', value =', value);
      if (!value.checked) {
        continue
      }
      tmp.push(value.id)
      // console.log('n =', n, ', i =', i, ', tmp =', tmp);
      if (n < properties.length - 1) {
        getResult(n + 1)
      } else {
        result.push(tmp.concat([]))
      }
      tmp.pop()
    }
  }
  getResult(n)
  // console.log(result);
  return result
}
export default {
  name: 'ProductCreatePage',
  methods: {
    ...mapActions([
      'getFrontendCategory',
      'selectCategory',
      'inputName',
      'inputDescription',
      'getProperty',
      'selectProperty',
      'checkValue',
      'inputSkuName',
      'inputSkuBarcode',
      'inputSkuPrice',
      'inputSkuSellUnit',
      'inputSkuStock',
      'checkSkuSellState',
      'uploadSkuImage',
      'deleteSku',
      'createProduct'
    ])
  },
  computed: {
    ...mapState({
      frontendCategories: state => state.category.front.sort((curr, next) => curr.sort < next.sort),
      isFrontendCategoryGetting: state => state.category.isFrontGetting,
      name: state => state.product.name,
      desc: state => state.product.desc,
      properties: state => state.product.properties,
      isPropertyGetting: state => state.property.isPropertyGetting,
      propertyOptions: state => state.property.properties,
      skus: state => state.product.skus,
      isCreating: state => state.product.isCreating
    }),
    categoryId () {
      let categoryId = this.$store.state.product.category_id
      if (!categoryId && this.frontendCategories.length) {
        let cate1 = this.frontendCategories.find(v => v.pid === 0)
        let cate2 = this.frontendCategories.find(v => v.pid === cate1.id)
        let cate3 = this.frontendCategories.find(v => v.pid === cate2.id)
        categoryId = cate3.id
        this.selectCategory({ categoryId })
      }
      return categoryId
    },
    skuData () {
      // console.log('generate sku data')
      let valueData = []
      // let _this = this
      for (let value of getValuesCombination(this.properties)) {
        if (this.skus.find(v => JSON.stringify(v.values) === JSON.stringify(value))) {
          continue
        }
        let properties = []
        value.forEach(v => {
          let property = this.propertyOptions.find(p => p.values.find(pv => pv.id === v))
          let value = property.values.find(pv => pv.id === v)
          properties.push({ name: property.name, value: value.name })
        })
        valueData.push({ properties, values: value, state: 1 })
      }
      let inputedData = []
      // console.log('skus in store', this.skus)
      this.skus.forEach((sku, index) => {
        let cardSku = { ...sku, index, properties: [] }
        sku.values.forEach(v => {
          let property = this.propertyOptions.find(p => p.values.find(pv => pv.id === v))
          let value = property.values.find(pv => pv.id === v)
          cardSku.properties.push({ name: property.name, value: value.name })
        })
        inputedData.push(cardSku)
      })
      let skuData = [ ...inputedData, ...valueData ]
      if (!skuData.length) {
        skuData.push({
          state: 1
        })
      }
      return skuData
    }
  },
  created () {
    // console.log('frontend category', this.frontendCategories)
    if (this.frontendCategories.length === 0 && !this.isFrontendCategoryGetting) {
      this.getFrontendCategory()
    }
    if (this.propertyOptions.length === 0 && !this.isPropertyGetting) {
      this.getProperty()
    }
  },
  components: {
    ProductBaseInfoFillOutCard,
    SkuFillOutCard
  }
}
</script>

<style>
</style>
