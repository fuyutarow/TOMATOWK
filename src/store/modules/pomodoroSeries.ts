import Vue from 'vue';
import {Module} from 'vuex';

const isDevelopment = process.env.NODE_ENV !== 'production';

const devConfig = {
  focus: {
    min: 0,
    sec: 10,
  },
  shortRest: {
    min: 0,
    sec: 5,
  },
  longRest: {
    min: 0,
    sec: 15,
  },
  maxSeries: 5,
};

const prodConfig = {
  focus: {
    min: 25,
    sec: 0,
  },
  shortRest: {
    min: 5,
    sec: 0,
  },
  longRest: {
    min: 15,
    sec: 0,
  },
  maxSeries: 5,
};

const state =  {
  count: 0,
  takeRest: true,
  config: isDevelopment ? devConfig : prodConfig,
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
