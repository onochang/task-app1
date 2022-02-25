<template>
  <header class="header">
    <fa class="fa-bars" :icon="['fas','bars']" />
    <fa class="fa-sign-out" :icon="['fas','arrow-right-from-bracket']" />
  </header>
  <SideNav />
  <main>
    <router-view/>
  </main>
</template>

<script>
import 'normalize.css'
import SideNav from './components/SideNav.vue'

export default {
  name: "App",
  components: {
    SideNav,
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

* {
  box-sizing: border-box;
}

h1,h2,p{
  margin: 0;
}

body {
  background-color: #8A47CC;
}

.header {
  background-color: #562D80;
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0px 3px 6px rgba($color: #000000, $alpha: 0.16);
}

.fa-bars,.fa-sign-out {
  color: #FFFFFF;
  font-size: 20px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
