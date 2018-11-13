<template>
  <v-toolbar app flat height=35>
    <v-toolbar-side-icon small></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn :to="{ name: 'clock' }" small icon>
        <i class="material-icons" size=25>av_timer</i>
      </v-btn>
      <v-btn :to="{ name: 'vine' }" small icon>
        <img src="@/assets/git_branch_762954.png" width=25 height=25></img>
      </v-btn>
      <template v-if='user.id'>
        <v-btn @click='signout' small icon>
          <v-avatar size=25>
            <img :src="user.photo"></img>
          </v-avatar>
        </v-btn>
      </template>
      <template v-else>
        <v-btn :to="{ name: 'signin'}" small icon>
          <i class="material-icons" size=25>person</i>
        </v-btn>
      </template>
    </v-toolbar-items>
    <v-snackbar v-model="notice" timeout=1000 top="true" :vertical="true">
      logout
      <v-btn color="pink" flat @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
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
  public notice = false;

  get user() {
    return this.$store.state.loginUser.status;
  }

  public async signout() {
    this.$store.dispatch('loginUser/signout');
    this.notice = true;
    this.$router.push({
      name: 'signin',
    });
  }

}
</script>
