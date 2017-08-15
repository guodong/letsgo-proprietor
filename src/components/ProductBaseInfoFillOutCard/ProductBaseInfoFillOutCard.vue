<template>
  <box class="form-horizontal" title="商品信息" :miniAble="true">
    <div class="form-group">
      <label class="control-label col-sm-2">类别</label>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-4">
            <select class="form-control" @change="selectCategory">
              <option v-for="category in frontendCategories" v-if="category.pid === 0"
                :value="category.id" :key="category.id"
                :selected="category.id === (category1 && category1.id)">
                  {{ category.name }}
                </option>
            </select>
          </div>
          <div class="col-sm-4">
            <select class="form-control" @change="selectCategory">
              <option v-for="category in frontendCategories"
                v-if="category.pid === category1.id" :value="category.id" :key="category.id"
                :selected="category.id === (category2 && category2.id)">
                  {{ category2.name }}
                </option>
            </select>
          </div>
          <div class="col-sm-4">
            <select class="form-control" @change="selectCategory">
              <option v-for="category in frontendCategories"
                v-if="category.pid === category2.id" :value="category.id" :key="category.id"
                :selected="category.id === (category3 && category3.id)">
                  {{ category3.name }}
                </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <input-group :value="name" @input="inputName" type="text" labelText="名称" :labelSpan="2" :inputSpan="10" placeholder="名称"/>
    <input-group :value="desc" @input="inputDescription" labelText="描述" :labelSpan="2" :inputSpan="10" placeholder="描述"/>
    <div class="form-group" v-if="isShowPropertySelector">
      <label class="col-sm-2 control-label">属性</label>
      <div class="col-sm-10">
        <multiselect :value="properties" @input="inputProperty" :options="propertyOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="属性类型" label="name" track-by="id">
          <span slot="noResult">没有找到相关属性</span>
        </multiselect>
      </div>
    </div>
    <checkbox-group v-for="property in properties" :options="property.values.map(v => ({ text: v.name, value: v.id, checked: v.checked }))" :labelText="property.name" @handleCheck="checkValue" :key="property.id"/>
  </box>
</template>

<script>
  import Box from '../Box'
  import InputGroup from '../InputGroup'
  import Multiselect from 'vue-multiselect'
  import CheckboxGroup from '../CheckboxGroup'
  export default {
    name: 'ProductBaseInfoFillOutCard',
    props: {
      frontendCategories: {
        type: Array,
        default: () => ([])
      },
      properties: {
        type: Array,
        default: () => ([])
      },
      propertyOptions: Array,
      categoryId: Number,
      name: String,
      desc: String,
      isShowPropertySelector: {
        type: Boolean,
        default: () => true
      }
    },
    computed: {
      category1 () {
        if (this.category2) {
          let categoryId = this.category2.pid
          let category = this.frontendCategories.find(v => v.id === categoryId)
          console.log('category 1', category)
          return category
        }
        return undefined
      },
      category2 () {
        // console.log('category 3', this.category3)
        if (this.category3) {
          let categoryId = this.category3.pid
          let category = this.frontendCategories.find(v => v.id === categoryId)
          console.log('category 2', category)
          return category
        }
        return undefined
      },
      category3 () {
        // console.log('category id', this.categoryId, typeof this.categoryId)
        let categoryId = this.categoryId
        // console.log('category id', categoryId, typeof categoryId)
        console.log('categories', this.frontendCategories)
        // console.log('category 3', this.frontendCategories.find(v => v.id === categoryId))
        let category = this.frontendCategories.find(v => v.id === categoryId)
        console.log('category 3', category)
        return category
      }
    },
    methods: {
      selectCategory (event) {
        // console.log(event.target.value)
        // console.log('frontend categories', this.frontendCategories)
        let categoryId = Number(event.target.value)
        let category = this.frontendCategories.find(v => v.id === Number(categoryId))
        // console.log('category', categoryId, category)
        if (category.code.endsWith('0000')) {
          let cate2 = this.frontendCategories.find(v => v.pid === category.id)
          let cate3 = this.frontendCategories.find(v => v.pid === cate2.id)
          categoryId = cate3.id
        } else if (category.code.endsWith('00')) {
          let cate3 = this.frontendCategories.find(v => v.pid === category.id)
          categoryId = cate3.id
        }
        this.$emit('selectCategory', { categoryId })
      },
      inputName (name) {
        // console.log('input name', name)
        this.$emit('inputName', { name })
      },
      inputDescription (desc) {
        this.$emit('inputDescription', { desc })
      },
      inputProperty (properties) {
        // console.log('input properties', properties)
        this.$emit('selectProperty', { properties })
      },
      checkValue (valueId, checked) {
        this.$emit('checkValue', { valueId, checked })
      }
    },
    components: {
      Box, InputGroup, Multiselect, CheckboxGroup
    }
  }
</script>
