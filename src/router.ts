import Vue from 'vue';
import Router from 'vue-router';
import {
  Clock,
  PomodoroList,
  PomodoroDetail,
  Note,
 } from './views';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/index.html', redirect: '/' },
    {
      path: '/',
      name: 'clock',
      component: Clock,
    },
    {
      path: '/note',
      name: 'note',
      component: Note,
    },
    {
      path: '/pomodoros',
      name: 'pomodoroList',
      component: PomodoroList,
    },
    {
      path: '/pomodoros/:timestamp',
      name: 'pomodoroDetail',
      component: PomodoroDetail,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
