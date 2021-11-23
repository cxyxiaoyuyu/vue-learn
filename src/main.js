import Vue from 'vue'
import App from './App.vue'

// import create from './utils/utils'
// Vue.prototype.$create = create

import Plugin from './utils/utils'

import router from './router'
import store from './store'
Vue.use(Plugin)

console.log(store,'store')
Vue.config.productionTip = false

const app =  new Vue({
  // 为什么要在这挂载router ？？？
  router,

  store,
  render: h => h(App)
}).$mount('#app')

console.log(app)
console.log(app.$options.render)