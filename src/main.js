import Vue from 'vue'
import App from './App.vue'
import * as electron from 'electron'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$electron = electron

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
