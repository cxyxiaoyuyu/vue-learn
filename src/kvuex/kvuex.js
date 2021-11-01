let Vue // 保存构造函数 避免import

// Vuex
class Store {
  constructor(options) {

    this._mutations = options.mutations
    this._actions = options.actions
    this._wrapperGetters = options.getters

    // $store.getters.doubleCounter
    const computed = {}
    this.getters = {}
    Object.keys(this._wrapperGetters).forEach(key => {

      // store.getters 的 key 要与computed 一一对应
      // computed 里的函数是没有参数的
      // store.getters 是只读属性
      computed[key] = () => {
        return this._wrapperGetters[key](this.state)
      }
      Object.defineProperty(this.getters,key,{
        get: () => this._vm[key]
      })
    })

    // 响应化处理state ???
    this._vm = new Vue({
      data: {
        // 两个$ Vue 不做处理 即不绑定到this实例上
        $$state: options.state  // 这里变化了会通知页面变化
      },
      computed
    })


    // 绑定上下文  这样也可以将commit和dispatch属性直接放到Store上 而不是原型上
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  get state(){
    console.log(this._vm,'this vm')
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