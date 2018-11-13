<template>
  <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
    <v-btn :to="{ name: 'clock' }" small icon>
      <span>Timer</span>
      <v-icon>av_timer</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'vine' }" small icon>
      <span>Project</span>
      <img src="@/assets/git_branch_762954.png" width=25 height=25></img>
    </v-btn>
    <v-btn :to="{ name: 'userDetail', params: { user_id: user.id }}" small icon>
      <span>Profile</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>


<script lang='ts'>
import {
  Component,
  Vue,
} from 'vue-property-decorator';


@Component
export default class BottomNav extends Vue {
  get user() {
    return this.$store.state.loginUser.status;
  }
}
</script>
