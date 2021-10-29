let Vue // 保存构造函数 避免import

// Vuex
class Store {
  constructor(options) {
    // 响应化处理state ???
    this._vm = new Vue({
      data: {
        // 两个$ Vue 不做处理 即不绑定到this实例上
        $$state: options.state  // 这里变化了会通知页面变化
      },
    })

    this._mutations = options.mutations
    this._actions = options.actions

    // 绑定上下文  这样也可以将commit和dispatch属性直接放到Store上 而不是原型上
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  get state(){
    return this._vm.$data.$$state
  }
  set state(v){
    console.error('不能直接改变state哦！！')
  }
  commit(type,payload){
    const entry = this._mutations[type]
    console.log(this.state,'state')
    if(entry){
      entry(this.state,payload)
    }
  }
  dispatch(type,payload){
    const entry = this._actions[type]
    if(entry){
      entry(this,payload)
    }
  }
}

function install(_Vue){
  Vue = _Vue

  Vue.mixin({
    beforeCreate(){
      if(this.$options.store){
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default {
  Store,
  install

}