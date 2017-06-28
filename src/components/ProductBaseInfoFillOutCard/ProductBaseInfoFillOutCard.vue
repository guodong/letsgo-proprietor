<template>
  <box class="form-horizontal" title="商品信息" :miniAble="true">
    <div class="form-group">
      <label class="control-label col-sm-2">类别</label>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-4">
            <select class="form-control" @change="selectCategory">
              <option v-for="category in frontendCategories" v-if="category.pid === 0" :value="category.id" :key="category.id" :selected="category.id === category1.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="col-sm-4">
            <select class="form-control" @change="selectCategory">
              <option v-for="category in frontendCategories" v-if="category.pid === category1.id" :value="category.id" :key="category.id" :selected="category.id === category2.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="col-sm-4">
            <select class="form-control" @change="selectCategory">
              <option v-for="category in frontendCategories" v-if="category.pid === category2.id" :value="category.id" :key="category.id" :selected="category.id === category3.id">{{ category.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <input-group :value="name" @input="inputName" type="text" labelText="名称" :labelSpan="2" :inputSpan="10" placeholder="名称"/>
    <input-group :value="desc" @input="inputDescription" labelText="描述" :labelSpan="2" :inputSpan="10" placeholder="描述"/>
    <div class="form-group">
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
      frontendCategories: Array,
      properties: Array,
      propertyOptions: Array,
      categoryId: Number,
      name: String,
      desc: String
    },
    computed: {
      category1 () {
        let categoryId = this.category2.pid
        return this.frontendCategories.find(v => v.id === categoryId)
      },
      category2 () {
        let categoryId = this.category3.pid
        return this.frontendCategories.find(v => v.id === categoryId)
      },
      category3 () {
        let categoryId = this.categoryId
        return this.frontendCategories.find(v => v.id === categoryId)
      }
    },
    methods: {
      selectCategory (event) {
        // console.log(event.target.value)
        // console.log('frontend categories', this.frontendCategories)
        let categoryId = event.target.value
        let category = this.frontendCategories.find(v => v.id === Number(categoryId))
        // console.log('category', categoryId, category)
        let code = category.code
        if (code.endsWith('0000')) {
          code = code.substr(0, 2) + '0101'
        } else if (code.endsWith('00')) {
          code = code.substr(0, 4) + '01'
        }
        this.$emit('selectCategory', { categoryId: this.frontendCategories.find(v => v.code === code).id })
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
