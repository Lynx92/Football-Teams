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
      state.footballTeams.push(...teams);

      state.footballTeams = state.footballTeams.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
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
    },
    addNotes(state, payload) {
      const pos = state.footballTeams.findIndex(team => team.id === payload.id);
      state.footballTeams[pos].notes = payload.note;
    }
  },
  actions: {
    getTeamsAct: ({ commit }, teams) => {
      commit("getTeams", teams);
    },
    makeFavAct: ({ commit }, teamID) => {
      commit("makeFav", teamID);
    },
    addNotesAct: ({ commit }, payload) => {
      commit("addNotes", payload);
    }
  },
  plugins: [createPersistedState()]
});
