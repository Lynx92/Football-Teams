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
          <div class="text-h6 col-12">{{ teamData.school }}</div>
        </div>

        <div
          :style="{ 'background-color': teamData.color, opacity: 0.9 }"
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
        color="red-9"
        icon="favorite"
      />

      <q-btn
        @click="checkFavorite()"
        v-else
        size="1rem"
        flat
        round
        color="red-9"
        icon="favorite_border"
      />

      <q-btn
        v-if="teamData.notes"
        @click="showNotes()"
        size="1rem"
        flat
        round
        color="yellow-9"
        icon="note"
      />

      <q-btn
        v-if="!teamData.notes && teamData.favorite"
        @click="showNotes()"
        size="1rem"
        flat
        round
        color="orange-9"
        icon="note_add"
      />
    </div>
    <q-dialog v-model="prompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Notes</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            clearable
            dense
            v-model="note"
            autofocus
            @keyup.enter="insertNotes()"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat icon="cancel" color="red" v-close-popup />
          <q-btn
            @click="insertNotes()"
            flat
            icon="done"
            color="green"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  name: "card",
  props: {
    teamData: Object
  },
  data: () => ({
    otherImg:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    prompt: false,
    note: ""
  }),
  methods: {
    replaceByDefault(e) {
      e.target.src = this.otherImg;
    },

    checkFavorite() {
      this.$store.dispatch("makeFavAct", this.teamData.id);
      if (this.teamData.favorite) this.prompt = true;
    },

    insertNotes() {
      const payload = { id: this.teamData.id, note: this.note };
      this.$store.dispatch("addNotesAct", payload);
      this.prompt = false;
    },

    showNotes() {
      this.prompt = true;
      this.note = this.teamData.notes;
    }
  },

  computed: {
    swapImg() {
      if (this.teamData.logos) {
        return this.teamData.logos[0];
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
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 1.5rem;
    right: -0.5rem;
  }
}
</style>
