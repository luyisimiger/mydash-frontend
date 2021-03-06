import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/plugins/ElementUI'
import '@/plugins/VueGapi'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import '@/filters'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

vue.$store.dispatch('loadData')
