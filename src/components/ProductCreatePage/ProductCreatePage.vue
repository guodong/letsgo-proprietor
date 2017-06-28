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
        <div class="col-md-12">
          <sku-fill-out-card class="box-warning" v-for="(sku, index) in skuData" :properties="sku.properties" :name="sku.name" @inputName="inputSkuName" :barcode="sku.barcode" @inputBarcode="inputSkuBarcode" :price="sku.price" @inputPrice="inputSkuPrice" :unit="sku.unit" @inputUnit="inputSkuSellUnit" :stock="sku.stock" @inputStock="inputSkuStock" :state="sku.state" @checkState="checkSkuSellState" @uploadImage="uploadSkuImage" :key="index" :index="sku.index" :values="sku.values" :number="index" :productName="name"/>
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
      'createProduct'
    ])
  },
  computed: {
    ...mapState({
      frontendCategories: state => state.category.front.sort((curr, next) => curr.sort < next.sort),
      isFrontendCategoryGetting: state => state.category.isFrontGetting,
      categoryId: state => state.product.category_id,
      name: state => state.product.name,
      desc: state => state.product.desc,
      properties: state => state.product.properties,
      isPropertyGetting: state => state.property.isPropertyGetting,
      propertyOptions: state => state.property.properties,
      skus: state => state.product.skus,
      isCreating: state => state.product.isCreating
    }),
    skuData () {
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
