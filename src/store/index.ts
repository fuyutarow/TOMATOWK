import Vue from 'vue';
import Vuex from 'vuex';
import timer from './modules/timer';
import pomodoroList from './modules/pomodoroList';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    timer,
    pomodoroList,
  },
  state: {
    currentUser: null,
  },
  mutations: {},
  actions: {},
});
