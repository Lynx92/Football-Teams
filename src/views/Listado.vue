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
        <Card :teamData="team" />
      </li>
    </ul>
    <div class="loadmore" @click="loadMore()">
      <q-btn
        size="2rem"
        flat
        round
        color="purple"
        icon="arrow_drop_down_circle"
      />
    </div>
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
    sort: false,
    initN: 0,
    finalN: 15,
    fullres: []
  }),

  methods: {
    getFootballTeams() {
      axios.get("https://api.collegefootballdata.com/teams").then(res => {
        this.fullres = res.data;
        let footballTeams = this.fullres
          .splice(this.initN, this.finalN)
          .map(team => ({
            ...team,
            favorite: false,
            notes: ""
          }));
        this.$store.dispatch("getTeamsAct", footballTeams);
      });
    },
    sortTeams() {
      this.sort = !this.sort;
    },

    loadMore() {
      this.initN = this.initN + 15;
      this.finalN = this.finalN + 15;
      this.getFootballTeams();
    }
  },

  mounted() {
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

.loadmore {
  width: 100vw;
  background-color: rgba(7, 7, 10, 0.692);
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 1;
  }
}
</style>
