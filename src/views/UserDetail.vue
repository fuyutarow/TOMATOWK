<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-avatar size=80>
          <img :src="user.photo"></img>
        </v-avatar>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="text-align: left;">
      <v-flex xs12 class="headline"> {{ user.name }} </v-flex>
      <v-flex xs12> {{ `@${user.id}` }} </v-flex>
      <v-flex xs1>
        <v-icon>mail_outline</v-icon>
      </v-flex>
      <v-flex xs11> {{ user.email }} </v-flex>
    </v-layout>
    <v-tabs color="transparent" show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab key='project' href="#tab-project">Project</v-tab>
      <v-tab key='readme' href="#tab-readme">README</v-tab>
      <v-tab key='pomodoro' href="#tab-pomodoro">Pomodoro</v-tab>

      <v-tabs-items>
        <v-tab-item id="tab-project">
          <v-card flat color="transparent">
            <v-card-text> project </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-readme">
          <v-card flat color="transparent">
            <v-card-text> readme </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-pomodoro">
          <v-card flat color="transparent">
            <v-card-text> pomodoro </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
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
