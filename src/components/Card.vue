<template>
  <q-card class="my-card">
    <router-link
      :to="{
        name: 'detalle',
        params: { teamId: teamData.id, teamData: teamData }
      }"
    >
      <q-img :src="swapImg" @error="replaceByDefault">
        <div class="row absolute-top items-center" :style="{ padding: 0 }">
          <div class="text-h6 col-12">{{ title }}</div>
        </div>

        <div
          :style="{ 'background-color': color, opacity: 0.9 }"
          class="absolute-bottom"
        />
      </q-img>
    </router-link>

    <div class="badge">
      <q-btn
        @click="checkFavorite()"
        v-if="teamData.favorite"
        size="1rem"
        flat
        round
        color="red"
        icon="favorite"
      />
      <q-btn
        @click="checkFavorite()"
        :style="{ 'z-index': 99 }"
        v-else
        size="1rem"
        flat
        round
        color="red"
        icon="favorite_border"
      />
    </div>
  </q-card>
</template>

<script>
export default {
  name: "card",
  props: {
    title: String,
    imgSrc: Array,
    color: String,
    teamData: Object
  },
  data: () => ({
    otherImg:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
  }),
  methods: {
    replaceByDefault(e) {
      e.target.src = this.otherImg;
    },

    checkFavorite() {
      this.$store.dispatch("makeFavAct", this.teamData.id);
    }
  },

  computed: {
    swapImg() {
      if (this.imgSrc) {
        return this.imgSrc[0];
      } else {
        return this.otherImg;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.my-card {
  position: relative;
  opacity: 0.8;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 1;
  }
  .badge {
    position: absolute;
    top: 1.5rem;
    right: -0.5rem;
  }
}
</style>
