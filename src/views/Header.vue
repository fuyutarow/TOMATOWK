<template>
  <v-toolbar app>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>TOMATOWK</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn :to="{ name: 'home' }" icon>
        <v-icon size=30>av_timer</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'about' }" icon>
        <v-icon size=30>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-avatar size=30>
          <template v-if="user">
            <img :src="user.photoURL" />
            </template>
            <template v-else>
              <img @click='_signin'
                src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"/>
            </template>
        </v-avatar>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang='ts'>
import firebase from 'firebase';
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
  get user() {
    return this.$store.state.currentUser;
  }

  public async created() {
    const user = await firebase.auth().getRedirectResult().then((result) => result.user);
    this.$store.state.currentUser! = user;
  }

  private async _signin() {
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

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
