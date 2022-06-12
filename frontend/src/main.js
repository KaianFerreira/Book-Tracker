// import scss globally
import './assets/_scss/app.scss'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import logger from './logger'

// importing vue component global
import VLoading from './components/VLoading.vue'
import VDatePicker from './components/VDatePicker.vue'

Vue.config.productionTip = false

// Error handler
Vue.config.errorHandler = (err, vm, info) => {
  logger.error(err, vm)
}

// Warning handler
Vue.config.warnHandler = (msg, vm, trace) => {
  logger.warn(msg, vm)
}

Vue.component('VLoading', VLoading)
Vue.component('VInputDatePicker', VDatePicker)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
