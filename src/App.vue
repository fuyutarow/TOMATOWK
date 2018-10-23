<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>TOMATOWK</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :to="{ name: 'home' }" flat>
          <i class="material-icons">
          access_time
        </i>
        </v-btn>
        <v-btn :to="{ name: 'about' }" flat>About</v-btn>
        <div v-if="user">
          <v-avatar>
            <img :src="user.photoURL" />
          </v-avatar>
            <span>{{ user.displayName }}</span>
        </div>
        <div v-else>
          <img alt="Vue logo" @click='_signin' height=40 src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"/>
        </div>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang='ts'>
import firebase from 'firebase';
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class App extends Vue {
  get user() {
    return this.$store.state.currentUser;
  }

  public async created() {
    const user = await firebase.auth().getRedirectResult().then((result) => result.user);
    this.$store.state.currentUser! = user;
  }

  private async _signin() {
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    const google = new firebase.auth.GoogleAuthProvider();
    return await firebase
      .auth()
      .signInWithRedirect(google)
      .then((result: any) => {
        this.$store.state.currentUser! = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  }
}
</script>
