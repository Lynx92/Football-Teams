import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    footballTeams: [],
    favorites: []
  },
  getters: {
    footballTeamsGet(state) {
      return state.footballTeams;
    },
    isFootballTeams(state) {
      return state.footballTeams.length;
    },
    favorites(state) {
      return state.favorites;
    },
    isFavorites(state) {
      return state.favorites.length;
    }
  },
  mutations: {
    getTeams(state, teams) {
      state.footballTeams = teams;
    },

    makeFav(state, teamID) {
      const pos = state.footballTeams.findIndex(team => team.id === teamID);
      if (state.footballTeams[pos].favorite) {
        const idx = state.favorites.findIndex(fav => fav.id === teamID);
        state.favorites.splice(idx, 1);
        state.footballTeams[pos].favorite = false;
      } else {
        state.favorites.push(state.footballTeams[pos]);
        state.footballTeams[pos].favorite = true;
      }
    }
  },
  actions: {
    getTeamsAct: ({ commit }, teams) => {
      commit("getTeams", teams);
    },
    makeFavAct: ({ commit }, teamID) => {
      commit("makeFav", teamID);
    }
  },
  plugins: [createPersistedState()]
});
