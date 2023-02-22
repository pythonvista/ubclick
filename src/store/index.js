import Vue from "vue";

import Vuex from "vuex";

// import data from "@/json_database/dataplans.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeUser: "",
    networksPack: [],
    dataPacks: [],
    cables: [],
    cablesPlan: [],
    electricity: [],
    epin: [],
    meterType:['Prepaid', 'Postpaid']
  },
  getters: {},
  mutations: {
    SET_ACTIVE_USER(state, payload) {
      localStorage.setItem("activeUser", JSON.stringify(payload));
      state.activeUser = payload;
    },
    UNSET_ACTIVE_USER(state, payload) {
      localStorage.removeItem("activeUser");
      state.activeUser = payload;
    },
    SET_DATAS(state, payload){
      state.dataPacks = payload;
    },
    SET_NETWORKS(state, payload){
      state.networksPack = payload
    },
    SET_CABLES(state, payload){
      state.cables = payload
    },
    SET_CABLESPLAN(state, payload){
      state.cablesPlan = payload
    },
    Set_Electricity(state, payload){
      state.electricity = payload
    },
    Set_Pin(state, payload){
      state.epin = payload
    },
  },
  actions: {
    ActiveUser({ commit }, payload) {
      commit("SET_ACTIVE_USER", payload);
    },
    RemoveUser({ commit }, payload) {
      commit("UNSET_ACTIVE_USER", payload);
    },
    SetNetwork({ commit }, payload){
      commit("SET_NETWORKS", payload);
    },
    SetDatas({ commit }, payload){
      commit("SET_DATAS", payload);
    },
    SetCablesPlan({ commit }, payload){
      commit("SET_CABLESPLAN", payload);
    },
    SetCables({ commit }, payload){
      commit("SET_CABLES", payload);
    },
    SetElectricity({ commit }, payload){
      commit("Set_Electricity", payload);
    },
    SetPin({ commit }, payload){
      commit("Set_Pin", payload);
    },


  },
  modules: {},
});
