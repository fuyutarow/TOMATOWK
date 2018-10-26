import Vue from 'vue';
import Vuex from 'vuex';
import timer from './modules/timer';
import pomodoroList from './modules/pomodoroList';
import pomodoroSeries from './modules/pomodoroSeries';

Vue.use(Vuex);


import path from 'path';
import { remote } from 'electron';
const fs = remote.require('fs');
export const recordPath = path.join(remote.app.getPath('appData'), '/tomatowk/record.json');

export default new Vuex.Store({
  modules: {
    timer,
    pomodoroList,
    pomodoroSeries,
  },
  state: {
    currentUser: null,
  },
  mutations: {},
  actions: {},
});
