import Vue from 'vue'
import App from './App.vue'

// import create from './utils/utils'
// Vue.prototype.$create = create

import Plugin from './utils/utils'

import router from './router'
Vue.use(Plugin)

Vue.config.productionTip = false

new Vue({
  router,  // 为什么要在这挂载router ？？？
  render: h => h(App)
}).$mount('#app')
