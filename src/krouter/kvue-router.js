let Vue

// 1 实现一个插件: 挂载$router

class KVueRouter {
  constructor(options){
    this.$options = options

    // 处理路由表 避免每次都循环
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })

    // 创建响应式的currentUrl 属性
    Vue.util.defineReactive(this,'currentUrl','/')
    // this.currentUrl = '/'
    // 监控url变化
    window.addEventListener('hashchange',this.onHashChange.bind(this)) // bind this
    window.addEventListener('load',this.onHashChange.bind(this))
  }
  onHashChange(){
    console.log(window.location.hash)
    this.currentUrl = window.location.hash.slice(1)
  }
}

KVueRouter.install = function(_Vue){
  // 保存构造函数，在KVueRouter里面使用
  Vue = _Vue

  // 挂载$router
  // 怎么获取根实例中的router选项
  Vue.mixin({
    beforeCreate(){
      if(this.$options.router){
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 实现全局组件router-link router-view
  Vue.component('router-link',{
    props: {
      to: {
        type: String,
        required: true
      }
    },
    // 什么是运行时环境  为啥不能用template ???
    // template: '<a></a>'

    // <a href="#/about">abc</a>
    render(h){
      return h('a',{attrs: {href: '#'+this.to}},this.$slots.default)

      // jsx 
      // return <a href={'#'+this.to}>{this.$slots.default}</a>
    }

  })

  Vue.component('router-view',{
    render(h){
      // let component = null
      // this.$router.$options.routes.forEach(route => {
      //   if(route.path === this.$router.currentUrl){
      //     component = route.component
      //   }
      // })
      // console.log('component',component)
      // return h(component)

      // 从路由表中寻找组件
      const component = this.$router.routeMap[this.$router.currentUrl]
      return h(component)
    }
  })
}

export default KVueRouter