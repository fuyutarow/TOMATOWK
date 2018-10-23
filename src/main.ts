import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;


// for axios
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_AXIOS_DEFAULTS_BASEURL;
axios.defaults.withCredentials = true; // use cookies
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; // for POST
axios.defaults.xsrfCookieName = 'csrftoken'; // fot POST


// for firevase
import firebase from 'firebase';
import { default as config } from '@/../firebase_config.json';
firebase.initializeApp(config);


// for Vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
Vue.use(Vuetify);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
