import Vue from 'vue'
import Vuex from 'vuex'
// import Vuex from './kvuex/kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter(state){
      console.log(state.counter)
      return state.counter*2
    }
  },
  mutations: {
    add(state){
      state.counter++
      console.log(this)
    }
  },
  actions: {
    add({commit}){
      setTimeout(()=>{
        commit('add')
      },1000)
    }
  }
})
