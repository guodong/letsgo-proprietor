import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Overview from '@/components/Overview'
import Products from '@/components/products/Index'
import ProductsCreate from '@/components/products/Create'
import Orders from '@/components/orders/Index'
import TestPage from '@/components/TestPage'
import LoginPage from '../components/LoginPage'

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
        }, {
          path: 'products/list',
          name: 'products',
          component: Products
        }, {
          path: 'products/create',
          component: ProductsCreate
        }, {
          path: 'orders/list',
          component: Orders
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
