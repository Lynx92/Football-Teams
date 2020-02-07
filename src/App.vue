<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: radial-gradient(circle, rgba(255,255,255,1) 35%, rgba(0,0,0,0.4864320728291317) 100%, rgba(232,237,238,1) 100%);
  min-width: 100vw;
  min-height: 100vh;
}
</style>
