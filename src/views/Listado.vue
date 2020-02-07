<template>
  <div>
    <div class="row justify-center">
      <q-input
        class="col-10 q-pa-md"
        clearable
        filled
        v-model="search"
        label="Search your Team"
      />

      <q-btn
        class="q-pa-md"
        @click="sortTeams()"
        size="1rem"
        flat
        round
        :color="sort ? 'red-9' : 'blue-9'"
        icon="sort_by_alpha"
      />
    </div>
    <ul>
      <li v-for="(team, id) in filteredTeams" :key="id">
        <Card
          :title="team.school"
          :imgSrc="team.logos"
          :color="team.color"
          :teamData="team"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import Card from "@/components/Card.vue";

export default {
  name: "listado",
  components: {
    Card
  },

  data: () => ({
    search: "",
    sort: false
  }),

  methods: {
    getFootballTeams() {
      axios.get("https://api.collegefootballdata.com/teams").then(res => {
        let footballTeams = res.data.splice(0,15).map(team => ({
          ...team,
          favorite: false,
          notes: ""
        }));
        this.$store.dispatch("getTeamsAct", footballTeams);
      });
    },
    sortTeams() {
      this.sort = !this.sort;
    }
  },

  beforeMount() {
    if (!this.$store.getters.isFootballTeams) this.getFootballTeams();
  },

  computed: {
    filteredTeams() {
      if (this.$store.getters.isFootballTeams) {
        return this.$store.getters.footballTeamsGet
          .filter(team => {
            return (
              team.school.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            );
          })
          .sort((a, b) => {
            if (this.sort) {
              if (a.school > b.school) {
                return -1;
              }
              if (a.school < b.school) {
                return 1;
              }
              return 0;
            } else {
              if (a.school > b.school) {
                return 1;
              }
              if (a.school < b.school) {
                return -1;
              }
              return 0;
            }
          });
      }
    }
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
    min-width: 16rem;
    padding: 1rem;
  }
}
</style>
