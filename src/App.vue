<template>
  <header class="header">
    <fa class="fa-bars" :icon="['fas','bars']" @click="toggleSideNav"/>
    <fa class="fa-sign-out" :icon="['fas','arrow-right-from-bracket']" @click="logout" />
  </header>
  <!-- storeの中のstate内のsideNavの状態を取得 -->
  <SideNav v-if="$store.state.sideNav" />
  <main>
    <router-view/>
  </main>
</template>

<script>
// Google認証機能、認証チェック機能をimport
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'normalize.css'
import SideNav from './components/SideNav.vue'
// vuexのactionsに接続するためにmapActionsをimport
import { mapActions } from 'vuex'

export default {
  name: "App",
  components: {
    SideNav,
  },
  methods: {
    // storeのactionsを呼び出す
    ...mapActions(['toggleSideNav','setLoginUser','logout','deleteLoginUser','fetchTasks'])
  },
  created(){
    // Googleの認証状態を取得
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setLoginUser(user)
        this.fetchTasks()
      } else {
        this.deleteLoginUser()
      }
    });
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
