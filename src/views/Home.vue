<template>
  <div class="home">
    <h1>Home</h1>
    <p @click="$store.commit('add')">counter: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter:{{$store.state.counter}}</p>
    <p>double counter:{{$store.getters}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {
  }
}
</script>
