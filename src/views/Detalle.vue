<template>
  <div>
    <div class="row q-pa-md">
      <div class="logo">
        <img :src="swapImg" @error="replaceByDefault" />
      </div>
      <div class="col justify-center text-h6 q-pa-md q-gutter-lg q-pt-xl">
        <div class="text-h2 text-bold">{{ teamData.school }}</div>
        <div v-if="teamData.mascot">Mascot: {{ teamData.mascot }}</div>
        <div v-if="teamData.abbreviation">
          Abbreviation: {{ teamData.abbreviation }}
        </div>
        <div v-if="teamData.division">Division:{{ teamData.division }}</div>
        <div v-if="teamData.conference">
          Conference: {{ teamData.conference }}
        </div>
        <div>
          <li v-if="teamData.alt_name1">{{ teamData.alt_name1 }}</li>
          <li v-if="teamData.alt_name2">{{ teamData.alt_name2 }}</li>
          <li v-if="teamData.alt_name3">{{ teamData.alt_name3 }}</li>
        </div>
      </div>
    </div>
    <div class="row q-pa-md q-gutter-lg">
      <div class="col" v-if="teamData.color">
        Main color
        <div
          class="team-color"
          :style="{ 'background-color': teamData.color }"
        />
      </div>
      <div class="col" v-if="teamData.alt_color">
        Alternative color
        <div
          class="team-color"
          :style="{ 'background-color': teamData.alt_color }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detalle",
  props: { teamId: [String, Number], teamData: Object },

  methods: {
    replaceByDefault(e) {
      e.target.src =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    }
  },

  computed: {
    swapImg() {
      if (this.teamData.logos) {
        return this.teamData.logos[0];
      } else {
        return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.team-color {
  width: 100%;
  height: 5rem;
  border-radius: 1rem;
}

.logo {
  border: 5px solid lightgray;
  border-radius: 1rem;
  padding: 1rem;
}

li {
  list-style-type: none;
}
</style>
