import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mediumZoom from 'medium-zoom'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['eq', 'eqn']

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    mediumZoom('img')
  }
}).$mount('#app')
