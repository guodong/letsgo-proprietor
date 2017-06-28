import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Overview from '@/components/Overview'
import Products from '@/components/products/Index'
import Orders from '@/components/orders/Index'
import TestPage from '@/components/TestPage'
import LoginPage from '../components/LoginPage'
import ProductCreatePage from '../components/ProductCreatePage'
import Create from '../components/products/Create.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/overview',
          component: Overview
        },
        {
          path: 'products/list',
          name: 'products',
          component: Products
        },
        {
          path: 'product/create',
          component: ProductCreatePage
        },
        {
          path: 'orders/list',
          component: Orders
        },
        {
          path: 'test',
          component: Create
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
