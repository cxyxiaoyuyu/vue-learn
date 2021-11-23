import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/views/Home.vue'
import About from '../src/views/About.vue'

Vue.use(VueRouter)

// 路由这里是工厂函数
export function createRouter(){
  return new VueRouter({
    routers: [{
      path: '/',
      component: Home
    },{
      path: '/about',
      component: About
    }
    ]
  })
}