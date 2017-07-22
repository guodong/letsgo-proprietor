import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout'
import HomePage from '../components/HomePage'
import ProductListPage from '../components/ProductListPage'
import OrderListPage from '../components/OrderListPage'
import TestPage from '@/components/TestPage'
import LoginPage from '../components/LoginPage'
import ProductCreatePage from '../components/ProductCreatePage'
import ProductEditPage from '../components/ProductEditPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'home',
          path: '',
          component: HomePage
        },
        {
          name: 'products',
          path: 'products',
          component: ProductListPage
        },
        {
          name: 'create_product',
          path: 'product/create',
          component: ProductCreatePage
        },
        {
          name: 'edit_product',
          path: 'products/:id/edit',
          component: ProductEditPage
        },
        {
          name: 'orders',
          path: 'orders',
          component: OrderListPage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }, {
      path: '/test',
      name: 'test',
      component: TestPage
    }
  ]
})

