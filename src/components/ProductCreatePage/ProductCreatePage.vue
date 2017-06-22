<template>
  <div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>商品管理<small>添加商品</small></h1>
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">商品信息</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label class="col-sm-2 control-label">类别</label>
                <div class="col-sm-10">
                  <div class="row">

                    <div class="col-md-4">
                      <select v-model="level1" class="form-control">
                        <option v-for="cate in cates" v-bind:value="cate" v-if="cate.pid == 0">
                          {{ cate.name }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <select v-model="level2" class="form-control">
                        <option v-for="cate in cates" v-bind:value="cate" v-if="cate.pid == level1.id">
                          {{ cate.name }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <select v-model="selCategory" class="form-control">
                        <option v-for="cate in cates" v-bind:value="cate" v-if="cate.pid == level2.id">
                          {{ cate.name }}
                        </option>
                      </select>
                    </div>

                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input v-model="product.name" type="text" class="form-control" placeholder="名称">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">描述</label>

                <div class="col-sm-10">
                  <textarea v-model="product.desc" name="desc" class="form-control" placeholder="描述"></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">属性</label>
                <div class="col-sm-10">
                  <multiselect v-model="selProperties" @input="propChange" :options="properties" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="属性类型" label="name" track-by="name"></multiselect>
                </div>
              </div>
              <div class="form-group" v-for="prop in selProperties">
                <label class="col-sm-2 control-label">{{prop.name}}</label>
                <div class="col-sm-10">
                  <div class="checkbox pull-left" style="min-width: 80px;" v-for="value in prop.values">

                    <label>
                      <input v-on:change="propChange" type="checkbox" v-bind:value="value" v-model="checkedValues">
                      {{value.name}}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- /.box-body -->
          </form>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12" v-for="(sku, index) in skus">
        <div class="box box-warning">
          <div class="box-header with-border">
            <h3 class="box-title">单品 #{{index + 1}}</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group" v-for="prop in sku.properties">
                <label class="col-sm-2 control-label">{{prop.prop.name}}</label>

                <div class="col-sm-10">
                  {{prop.value.name}}
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">名称</label>

                <div class="col-sm-10">
                  <input v-model="sku.name" type="text" class="form-control" placeholder="名称">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">条形码</label>

                <div class="col-sm-10">
                  <input v-model="sku.barcode" type="text" class="form-control" placeholder="条形码">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">价格</label>

                <div class="col-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon">¥</span><input v-model="sku.price" type="text" class="form-control" placeholder="价格">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">单位</label>

                <div class="col-sm-10">
                  <input type="text" v-model="sku.unit" class="form-control" placeholder="单位" value="个">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">库存</label>

                <div class="col-sm-10">
                  <input v-model="sku.stock" type="text" class="form-control" placeholder="库存">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">销售状态</label>
                <div class="col-sm-10">
                  <div class="radio">
                    <label>
                      <input v-model="sku.state" type="radio" name="optionsRadios" value="1" checked="">
                      上架
                    </label>
                    <label>
                      <input v-model="sku.state" type="radio" name="optionsRadios" value="2">
                      下架
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">图片</label>

                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-md-3" v-for="img in sku.images">
                      <button onclick="console.log('wenke');" class="thumbnail">
                        <img v-bind:src="img" alt="...">
                      </button>
                    </div>
                    <div class="col-md-3">
                      <span v-on:click="upload(sku)" class="info-box-icon bg-light-blue"><i class="fa fa-plus"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </form>
        </div>
      </div>
    </div>
    <button v-on:click="submit" style="width: 100%;" type="button" class="btn btn-success">发布商品</button>
  </section>
  <!-- /.content -->
    <input style="display: none;" id="browse" type="file" v-on:change="previewFiles()" multiple>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import apiUrl from '../../utils/apiUtils.js'
export default {
  name: 'hello',
  components: { Multiselect },
  data () {
    return {
      product: {},
      properties: [],
      selProperties: [],
      checkedValues: [],
      skus: [],
      categories: [],
      level1: {children: []},
      level2: {children: []},
      selCategory: '',
      currentSku: null,
      cates: []
    }
  },
  created () {
    this.$http.get(`${apiUrl}/property`).then(
      resp => {
        this.properties = resp.body.data
        this.product.skus = this.skus
        this.propChange()
      }
    )
    this.$http.get(`${apiUrl}/backendcategory`).then(
      resp => {
        this.cates = resp.body.data
      }
    )
  },
  methods: {
    previewFiles () {
      var sku = this.currentSku
      var files = document.querySelector('input[type=file]').files

      function readAndPreview (file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          var reader = new FileReader()

          reader.addEventListener('load', function () {
            sku.images.push(reader.result)
          }, false)

          reader.readAsDataURL(file)
        }
      }

      if (files) {
        [].forEach.call(files, readAndPreview)
      }
    },
    upload (sku) {
      this.currentSku = sku
      document.querySelector('input[type=file]').click()
    },
    propChange () {
      /** arrange items **/
      var arr = []
      for (var i in this.selProperties) {
        var obj = {
          prop: this.selProperties[i],
          checks: []
        }
        for (var j in this.selProperties[i].values) {
          // get check or not
          var checked = false
          for (var k in this.checkedValues) {
            if (this.checkedValues[k].id === this.selProperties[i].values[j].id) {
              checked = true
              break
            }
          }
          if (checked) {
            obj.checks.push(this.selProperties[i].values[j])
          }
        }
        arr.push(obj)
      }
      /** /arrange items **/

      var count = 1
      for (var iArr in arr) {
        count *= arr[iArr].checks.length
      }

      if (count === 0) {
        return
      }

      this.skus.splice(0, this.skus.length)
      for (var i = 0; i < count; i++) {
        var calCount = i
        var sku = {
          images: [],
          state: 1
        }
        sku.properties = []
        for (var j in arr) {
          var offset = calCount % arr[j].checks.length
          calCount = parseInt(calCount / arr[j].checks.length)
          sku.properties[j] = {
            prop: arr[j].prop,
            value: arr[j].checks[offset]
          }
        }
        this.skus.push(sku)
      }
    },
    submit () {
      var me = this
      this.product.category_id = this.selCategory.id
      this.product.skus.forEach(function (sku) {
        sku.values = []
        sku.properties.forEach(function (prop) {
          sku.values.push(prop.value.id)
        })
      })
      // console.log(this.product)
      this.$http.post(`${apiUrl}/product`, this.product, {
        headers: {
          Authorization: `Bearer {${localStorage.getItem('token')}}`
        }
      })
      .then(function (resp) {
        switch (resp.body.code) {
          case 0:
            this.$router.push('/products/list')
            break
          default:
            console.log('error', resp.message)
        }
      })
      .catch(err => {
        console.log('error', err)
        switch (err.body.code) {
          case 1000:
            this.$router.push('/auth')
            break
          default:
            console.log('error', err)
            break
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .info-box-icon {
    cursor: pointer;
  }
</style>
