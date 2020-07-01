import Vue from 'vue'
import App from './app.vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(Router)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
