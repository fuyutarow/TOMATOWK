import Vue from 'vue';
import Router from 'vue-router';
import {
  Clock,
  Signin,
  UserDetail,
  PomodoroList,
  PomodoroVine,
  PomodoroDetail,
 } from './views';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/index.html', redirect: '/' },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/users/:user_id',
      name: 'userDetail',
      component: UserDetail,
    },
    {
      path: '/',
      name: 'clock',
      component: Clock,
    },
    {
      path: '/vine',
      name: 'vine',
      component: PomodoroVine,
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
