import moment from 'moment';
import fs from 'fs';
import Vue from 'vue';
import {Module} from 'vuex';


const state =  {
  all: [{
    timestamp: 0,
    message: '',
    color: 'white',
  }],
};

const actions = {
  push({ commit }, pomodoro) {
    commit('pushPomodoro', pomodoro);
    commit('dump');
  },
  pushWhite({ commit }) {
    commit('pushWhite');
    commit('dump');
  },
  // pop({ commit }, pomodoro) {
  //   commit('popPomodoro', pomodoro);
  // },
  lastPatch({ commit }, pomodoro) {
    commit('lastPatch', pomodoro);
  },
  dump({ commit }) {
    commit('dump');
  },
  load({ commit }, pomodoros) {
    commit('load', pomodoros);
  },
};


const pomodoroCode = (pomodoro) =>
      pomodoro.color === 'white' ? 'W' :
      pomodoro.color === 'yellow' ? 'Y' :
      pomodoro.color === 'red' ?
        (pomodoro.blank ? 'r' : 'R') :
      pomodoro.color === 'green' ?
        (pomodoro.blank ? 'g' : 'G') : 'W';

const haltMap = {
    W: 'W',
    r: 'rW',
    R: 'RW',
    Y: 'YW',
    g: 'W',
    G: 'GW',
};

const focusMap = {
    W: 'Wr',
    r: 'r',
    R: 'Rr',
    Y: 'YWr',
    g: 'Wr',
    G: 'GWr',
};

const fromCode = {
    r: { color: 'red', blan: true},
    R: { color: 'red', blan: false},
    g: { color: 'green', blan: true},
    G: { color: 'green', blan: false},
    W: { color: 'white', blan: true},
    Y: { color: 'yellow', blan: false},
};


const mutations = {
  pushPomodoro(_state, pomodoro) {
    const p = Object.assign({}, {
      timestamp : moment().format(),
      message : '',
      blank : true,
    }, pomodoro);
    _state.all.push(p);
  },
  pushWhite(_state) {
    if ( _state.all.slice(-1)[0].color === 'white') { return; }
    _state.all.push({
      timestamp : moment().format(),
      color: 'white',
    });
  },
  // popPomodoro(_state, pomodoro) {
  //   if (_state.all.length) {
  //     _state.all.pop();
  //   }
  // },
  lastPatch(_state, pomodoro) {
    const pop = _state.all.pop();
    const renew = Object.assign({}, pop, pomodoro);
    _state.all.push(renew);
  },
  dump(_state) {
    const json = JSON.stringify({
      table: _state.all,
    }, null, 4);
    fs.writeFile('./record.json', json, 'utf8', (error) => {});
  },
  load(_state, pomodoros) {
    _state.all = pomodoros;
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
