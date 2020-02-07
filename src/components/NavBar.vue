<template>
  <div id="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/favoritos">
      <span class="fav"
        >Favourites
        <div class="counter" v-if="isFavorites">{{ isFavorites }}</div>
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "navbar",
  computed: {
    ...mapGetters(["isFavorites"])
  }
};
</script>

<style scooped lang="scss">
#navbar {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
    .fav {
      position: relative;
      .counter {
        color: rgb(255, 255, 255);
        background-color: #f45500c9;
        border-radius: 0.2rem;
        width: 1.2rem;
        height: 1rem;
        position: absolute;
        right: -1.2rem;
        top: -0.5rem;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
