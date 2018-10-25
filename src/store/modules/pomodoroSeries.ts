import Vue from 'vue';
import {Module} from 'vuex';


const state =  {
  count: 0,
  takeRest: true,
};

const actions = {
  increment({ commit }) {
    commit('increment');
  },
  reset({ commit }) {
    commit('reset');
  },
  setTakeRest({ commit }, TF) {
    commit('setTakeRest', TF);
  },
};

const mutations = {
  increment(_state) {
    _state.count++ ;
  },
  reset(_state) {
    _state.count = 0 ;
  },
  setTakeRest(_state, TF) {
    _state.takeRest = TF;
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
