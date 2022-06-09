import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import logger from './logger'
Vue.config.productionTip = false

// Error handler
Vue.config.errorHandler = (err, vm, info) => {
  logger.error(err, vm)
}

// Warning handler
Vue.config.warnHandler = (msg, vm, trace) => {
  logger.warn(msg, vm)
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
