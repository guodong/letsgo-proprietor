import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import store from './store'

Vue.use(Resource)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.body.className = 'hold-transition skin-blue sidebar-mini'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
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
  components: { App }
})

