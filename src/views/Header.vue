<template>
  <v-toolbar app flat height=35>
    <!--
    <v-toolbar-side-icon small></v-toolbar-side-icon>
    -->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn :to="{ name: 'clock' }" small icon>
        <v-icon size=25>av_timer</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'pomodoroList' }" small icon>
        <v-icon size=25>view_list</v-icon>
      </v-btn>
      <!--
      <v-btn small icon>
        <v-avatar size=25>
          <template v-if="user">
            <img :src="user.photoURL"></img>
          </template>
          <template v-else>
            <img @click='_signin'
              src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"/>
          </template>
        </v-avatar>
      </v-btn>
      -->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang='ts'>
import firebase from 'firebase';
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  // get user() {
  //   return this.$store.state.currentUser;
  // }

  // public async created() {
  //   const user = await firebase.auth().getRedirectResult().then((result) => result.user);
  //   this.$store.state.currentUser! = user;
  // }

  // private async _signin() {
  //   // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  //   const google = new firebase.auth.GoogleAuthProvider();
  //   return await firebase
  //     .auth()
  //     .signInWithRedirect(google)
  //     .then((result: any) => {
  //       this.$store.state.currentUser! = result.user;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       const email = error.email;
  //       const credential = error.credential;
  //     });
  // }
}
</script>
