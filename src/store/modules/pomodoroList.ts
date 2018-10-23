import moment from 'moment';
import Vue from 'vue';
import {Module} from 'vuex';


const state =  {
  all: [],
};

const actions = {
  push({ commit }, pomodoro) {
    commit('pushPomodoro', pomodoro);
  },
};

const mutations = {
  pushPomodoro(_state, pomodoro) {
    pomodoro.timestamp = pomodoro.timestamp ? pomodoro.timestamp : moment().unix();
    pomodoro.color! = pomodoro.color;
    pomodoro.message = pomodoro.message ? pomodoro.message : '';
    _state.all.push(pomodoro);
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
