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
  pop({ commit }, pomodoro) {
    commit('popPomodoro', pomodoro);
  },
};

const mutations = {
  pushPomodoro(_state, pomodoro) {
    pomodoro.timestamp = pomodoro.timestamp ? pomodoro.timestamp : moment().unix();
    pomodoro.color! = pomodoro.color;
    if (pomodoro.color === 'white') {
      const popPomodoro = _state.all.pop();
      if ( popPomodoro.color !== 'white') {
        _state.all.push(popPomodoro);
      }
    }
    pomodoro.message = pomodoro.message ? pomodoro.message : '';
    _state.all.push(pomodoro);
  },
  popPomodoro(_state, pomodoro) {
    _state.all.pop();
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
