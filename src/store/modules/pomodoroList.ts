import moment from 'moment';
import Vue from 'vue';
import {Module} from 'vuex';

import { remote } from 'electron';

const fs = remote.require('fs');
const recordPath = './recordPath.json';


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
  popWhite({ commit }) {
    commit('popWhite');
    commit('dump');
  },
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
  popWhite(_state) {
    const pop = _state.all.pop();
    if ( pop.color !== 'white') {
      _state.all.push(pop);
    }
  },
  lastPatch(_state, pomodoro) {
    const pop = _state.all.pop();
    const renew = Object.assign({}, pop, pomodoro);
    _state.all.push(renew);
  },
  dump(_state) {
    const json = JSON.stringify({
      table: _state.all,
    }, null, 4);
    fs.writeFile(recordPath, json, 'utf8', (error) => {});
  },
  load(_state) {
    if (!fs.existsSync(recordPath)) { return; }
    const json = JSON.parse(fs.readFileSync(recordPath, 'utf-8'));
    const pomodoros = json.table;
    if (pomodoros) {
      _state.all = pomodoros;
    }
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
