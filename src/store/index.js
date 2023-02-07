import Vue from "vue";

import Vuex from "vuex";

import data from "@/json_database/dataplans.json";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser: '',
    networksPack:[
      {name: 'Mtn', id: 1, img:'https://i.imgur.com/d4NW1E8.png' },
      {name: 'Glo', id: 2, img: 'https://i.imgur.com/AYwwZ70.png'},
      {name: '9mobile', id: 3, img: 'https://i.imgur.com/heRpzyN.png'},
      {name: 'Airtel', id: 4, img: 'https://i.imgur.com/tKCtfjp.png'}
    ],
    dataPacks: data
  },
  getters: {
  },
  mutations: {
    SET_ACTIVE_USER(state, payload) {
      localStorage.setItem("activeUser", JSON.stringify(payload));
      state.activeUser = payload;
    },
    UNSET_ACTIVE_USER(state, payload) {
      localStorage.removeItem('activeUser')
      state.activeUser = payload;
    },
    SET_DATAS: (state, payload) => { 
      state.dataPacks = payload;
  }
  },
  actions: {
    ActiveUser({ commit }, payload) {
      commit("SET_ACTIVE_USER", payload);
    },
    RemoveUser({ commit }, payload) {
      commit("UNSET_ACTIVE_USER", payload);
    },

  },
  modules: {
  }
})
