<template>
  <div id="app">
    <div id="nav">
      <!-- {{isLogin}} 
      {{counter}}
      {{count}}
      {{countLocal}} -->
      <!-- <router-link to="/">Home {{isLogin}}</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      {{num}}
    </div>
    <!-- <router-view></router-view> -->
  </div>

<!-- router-link router-view 是哪来的 ？？？ -->
</template>

<style lang="scss" scoped>

</style>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      num: 10
    }
  },
  mounted(){
    this.num = 20
  },
  computed: {
    isLogin(){
      return true
    },
    ...mapState(['counter']), // {counter: function(){}}
    ...mapState({
      count: state => state.counter,
      countLocal: function(state) {
        return state.counter + this.num
      }
    })
  }
}
</script>
<style scoped>
.abc {
  background: red
}
</style>
