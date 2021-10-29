import Vue from 'vue'
import Notice from '@/components/notice' 

function create(Component, props){
  // 组件的构造函数如何获取
  // 1 render

  // const vm = new Vue({
  //   // h() 返回vnode 虚拟dom  
  //   // 需要挂载才能变成真实dom
  //   render: h => h(Component, { props })
  // }).$mount()  // 不指定宿主元素，会创建真实dom 但是不会追加操作

  // // vm.$el 是真实dom  这样可以将真实dom放在body上
  // document.body.appendChild(vm.$el)

  // const component = vm.$children[0]
  // component.remove = () => {
  //   document.body.removeChild(vm.$el)
  //   vm.$destroy()
  // }

  // return component


  // Component 是一个对象 并不是组件实例
  // component 是组件实例 


  // 2 Vue.extend()
  const Constructor = Vue.extend(Component)
  const component = new Constructor({
    propsData: props
  }).$mount()
  // mount 后才有$el 属性
  document.body.appendChild(component.$el)
  component.remove = () => {
    document.body.removeChild(component.$el)
    component.$destroy()
  }

  return component
  
}

// export default create

// 改为插件的方式

export default {
  install(Vue){
    Vue.prototype.$notice = function(propsData){
      return create(Notice,propsData)
    }
  }
}