import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'

import api from './api/index'
Vue.prototype.$api = api

import i18n from './lang/index'

Vue.config.productionTip = false
Vue.prototype.$store = store

let userInfo = localStorage.getItem('userInfo');
if (userInfo) {
  store.commit('userModule/changeUser', JSON.parse(userInfo));
}

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
