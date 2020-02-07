<template>
  <div>
    <ul v-if="isFavorites">
      <li v-for="(team, idx) in favorites" :key="idx">
        <Card
          :title="team.school"
          :imgSrc="team.logos"
          :color="team.color"
          :teamData="team"
        />
      </li>
    </ul>
    <div
      class="justify-center text-h3 q-gutter-y-xl q-pa-md q-mt-xl noFav"
      v-else
    >
      <p>Nothing Found!</p>
      <p>Add some Teams to your Favourites!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "@/components/Card.vue";
export default {
  name: "favoritos",
  components: {
    Card
  },
  computed: {
    ...mapGetters(["favorites", "isFavorites"])
  }
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  align-items: center;
  justify-content: center;

  li {
    list-style-type: none;
    min-width: 20rem;
    padding: 1rem;
  }
}

.noFav {
  opacity: 0.7;
}
</style>
