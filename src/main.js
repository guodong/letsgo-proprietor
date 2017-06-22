// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Multiselect from 'vue-multiselect'
import Print from './components/orders/Print'
import Resource from 'vue-resource'
import store from './store'

Vue.use(Resource)
Vue.component(Multiselect)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.body.className = 'hold-transition skin-blue sidebar-mini'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      })
    } else {
      if (to.path === '/') {
        next({
          path: '/overview'
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, Multiselect, Print }
})

