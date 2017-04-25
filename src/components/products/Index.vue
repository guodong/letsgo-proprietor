<template>
  <div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      商品管理
      <small>商品列表</small>
    </h1>
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">商品列表</h3>
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
                <th>名称</th>
                <th>单品</th>
                <!--<th>价格</th>-->
                <!--<th>状态</th>-->
                <!--<th>操作</th>-->
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in products">
                <td>{{product.id}}</td>
                <td style="width: 180px; vertical-align: middle">{{product.name}}</td>
                <td>
                  <table class="table table-hover subtable">
                    <thead>
                    <th>ID</th>
                    <th>名称</th>
                    <th>价格</th>
                    <th>库存</th>
                    </thead>
                    <tbody>
                    <tr v-for="sku in product.skus">
                      <td>{{sku.id}}</td>
                      <td>{{sku.name}}</td>
                      <td>¥{{sku.price}}/{{sku.unit}}</td>
                      <td>{{sku.stock}}</td>
                    </tr>
                    </tbody>
                  </table>
                </td>
                <!--<td>{{product.id}}</td>-->
                <!--<td>{{product.name}}</td>-->
                <!--<td>{{product.code}}</td>-->
                <!--<td>¥3.50</td>-->
                <!--<td><span class="label label-success">激活</span></td>-->
                <!--<td><a href="#">编辑</a></td>-->
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
export default {
  name: 'hello',
  data () {
    return {
      products: []
    }
  },
  created () {
    this.$http.get('http://api.letsgo.qfplan.com/product').then(
      resp => { this.products = resp.body.data.data }
    )
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
