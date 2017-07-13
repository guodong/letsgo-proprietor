import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout'
import HomePage from '../components/HomePage'
import ProductListPage from '../components/ProductListPage'
import Orders from '@/components/orders/Index'
import TestPage from '@/components/TestPage'
import LoginPage from '../components/LoginPage'
import ProductCreatePage from '../components/ProductCreatePage'

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
          path: 'products',
          name: 'products',
          component: ProductListPage
        },
        {
          path: 'product/create',
          component: ProductCreatePage
        },
        {
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
