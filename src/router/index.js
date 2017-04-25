import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Auth from '@/components/Auth'
import Overview from '@/components/Overview'
import Products from '@/components/products/Index'
import ProductsCreate from '@/components/products/Create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: { requiresAuth: true },
      children: [{
        path: '/overview',
        component: Overview
      }, {
        path: 'products/list',
        name: 'products',
        component: Products
      }, {
        path: 'products/create',
        component: ProductsCreate
      }]

    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})
