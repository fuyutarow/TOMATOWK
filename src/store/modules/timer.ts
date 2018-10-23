import moment from 'moment';
import Vue from 'vue';
import {Module} from 'vuex';



const initMin = 1;

const state =  {
  pomodoroTable: [],
  min: initMin,
  sec: 0,
  isRest: false,
  nSeries: 0,
};

const actions = {
  count({ commit }) {
    commit('count');
  },
  incrementSeries({ commit }) {
    commit('incrementSeries');
  },
  setTimer({ commit }, min) {
    console.log('setTimer')
    commit('setTimer', min);
  },
  setIsRest({ commit }, TF) {
    console.log('setIsRest')
    commit('setIsRest', TF);
  },
  clock({ commit }, payload){

  }
};

const mutations = {
  setTimer(_state, min) {
    _state.min = min? min-1: initMin-1;
    _state.sec = 59;
  },
  setIsRest(_state, TF) {
    _state.isRest = TF;
  },
  incrementSeries(_state) {
    _state.nSeries++;
  },
  count(_state) {
    if (_state.sec <= 0 && _state.min >= 1) {
      _state.min--;
      _state.sec = 59;
    } else if (_state.sec <= 0 && _state.min <= 0) {
      clearInterval(_state.timerObj);
      const now = moment().unix();
      const pomodoro = {
        timestamp: now,
        message: '',
        color: 'red',
      };
      _state.pomodoroTable.push(pomodoro);
      _state.min = initMin - 1;
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
