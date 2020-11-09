import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ECharts from 'echarts'
import VueECharts from 'vue-echarts'
import * as tf from '@tensorflow/tfjs'

Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts
Vue.prototype.$tf = tf
Vue.component('vue-echarts', VueECharts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
