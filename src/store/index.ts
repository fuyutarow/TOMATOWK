import Vue from 'vue';
import Vuex from 'vuex';
import timer from './modules/timer';
import pomodoroList from './modules/pomodoroList';
import pomodoroSeries from './modules/pomodoroSeries';
import loginUser from './modules/loginUser';

Vue.use(Vuex);

const isDevelopment = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
  modules: {
    timer,
    pomodoroList,
    pomodoroSeries,
    loginUser,
  },
});
