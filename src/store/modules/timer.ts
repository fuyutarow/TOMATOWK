import moment from 'moment';
import Vue from 'vue';
import {Module} from 'vuex';



const initMin = 1;

const state =  {
  pomodoroTable: [],
  min: initMin,
  sec: 0,
  takeRest: true,
  nSeries: 0,
  isCountUp: false,
  timerObj: null,
};

const actions = {
  count({ commit }) {
    commit('count');
  },
  incrementSeries({ commit }) {
    commit('incrementSeries');
  },
  setTimerObj({ commit }, timerObj) {
    commit('setTimerObj', timerObj);
  },
  clearTimerObj({ commit }) {
    commit('clearTimerObj');
  },
  setTimer({ commit }, mmss) {
    commit('setTimer', mmss);
  },
  setTakeRest({ commit }, TF) {
    commit('setTakeRest', TF);
  },
  pushPomodoroTable({ commit }, pomodoro) {
    commit('pushPomodoroTable', pomodoro);
  },
  countDown({ commit }) {
    commit('countDown');
  },
  resetSeries({ commit }) {
    commit('resetSeries');
  },
};

const mutations = {
  pushPomodoroTable(_state, pomodoro) {
    _state.pomodoroTable.push(pomodoro);
  },
  resetSeries(_state) {
    _state.nSeries = 0;
  },
  setTimerObj(_state, timerObj) {
    _state.timerObj = timerObj;
  },
  clearTimerObj(_state) {
    clearInterval(_state.timerObj);
  },
  setTimer(_state, mmss) {
    if (mmss) {
      _state.min = mmss.mm;
      _state.sec = mmss.ss;
    } else {
      _state.min = initMin - 1;
      _state.sec = 59;
    }
    _state.isCountUp = false;
  },
  setTakeRest(_state, TF) {
    _state.takeRest = TF;
  },
  incrementSeries(_state) {
    _state.nSeries++;
  },
  countDown(_state) {
    if (_state.sec <= 0 && _state.min >= 1) {
      _state.min--;
      _state.sec = 59;
    } else if (_state.sec <= 1 && _state.min <= 0) {
      _state.isCountUp = true;
      _state.sec--;
    } else {
      _state.sec--;
    }
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
