import moment from 'moment';
import Vue from 'vue';
import {Module} from 'vuex';


const state =  {
  min: 0,
  sec: 0,
  timerObj: null,
  inPause: true,
};

const actions = {
  pause({ commit }) {
    commit('clearInterval');
    commit('setInPause', true);
  },
  play({ commit }) {
    commit('countDown');
    commit('setInPause', false);
  },
  setTimer({ commit }, mmss) {
    commit('setTimer', mmss);
  },
};

const mutations = {
  clearInterval(_state) {
    clearInterval(_state.timerObj);
  },
  setInPause(_state, TF) {
    _state.inPause = TF;
  },
  clearTimerObj(_state) {
    clearInterval(_state.timerObj);
  },
  countDown(_state) {
    _state.timerObj = setInterval(() => {
      if (_state.sec <= 0 && _state.min >= 1) {
        _state.min--;
        _state.sec = 59;
      } else if (_state.sec <= 0 && _state.min <= 0) {
        clearInterval(_state.timerObj);
      } else {
        _state.sec--;
      }
    }, 1000);
  },
  setTimer(_state, mmss) {
    _state.min = mmss.min;
    _state.sec = mmss.sec;
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
