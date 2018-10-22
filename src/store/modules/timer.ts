import Vue from 'vue';
import {Module} from 'vuex';


const state =  {
  pomodoro: 0,
  min: 25,
  sec: 0,
};

const actions = {
  count({ commit }) {
    commit('count');
  },
};

const mutations = {
  count(_state) {
    if (_state.sec <= 0 && _state.min >= 1) {
      _state.min--;
      _state.sec = 59;
    } else if (_state.sec <= 0 && _state.min <= 0) {
      clearInterval(_state.timerObj);
      _state.pomodoro++;
      _state.min = 24;
      _state.sec = 59;
    } else {
      _state.sec--;
    }
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
