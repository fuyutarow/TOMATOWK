import axios from 'axios';
import firebase from 'firebase';


const authFirebase = async () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    const google = new firebase.auth.GoogleAuthProvider();
    return await firebase
      .auth()
      .signInWithPopup(google)
      .then((result: any) => {
        // this.$store.state.token! = result.credential.accessToken;
        // this.$store.state.currentUser! = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
};


const state =  {
  status: {},
};

const actions = {
  whoiam({ commit }) {
    return axios
      .get(`/api/whoiam/`)
      .then((request) => request.data)
      .then((user) => {
        commit('setUser', user);
        return user;
      });
    },
  async signin({ commit }) {
    await authFirebase();
    const token: string = await firebase
      .auth().currentUser!.getIdToken(true);
    return await axios
      .get(`/api/login/?token=${token}`)
      .then((request) => request.data)
      .then((user) => {
        commit('setUser', user);
        return user;
      });
  },
  signout({ commit }) {
    firebase.auth().signOut();
    return axios
      .get(`/api/logout/`)
      .then((request) => request.data)
      .then((user) => {
        commit('setUser', {});
      });
  },
};

const mutations = {
  setUser(_state, user) {
    _state.status = Object.assign({}, _state.status, user);
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
