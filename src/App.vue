<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
      Home
      <svg>
        <use xlink:href="#icon-picture"></use>
      </svg >
      <svg>
        <use xlink:href="#icon-hotal"></use>
      </svg >
      </router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>

</template>

<style lang="scss" scoped>

</style>

<script>
export default {}
</script>

