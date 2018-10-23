<template>
  <v-container>
    <v-layout>
      <v-flex>
        {{ this.$route.params.timestamp }}
        <p>{{ pomodoro.timestamp}}</p>
        <v-textarea solo name="input-7-4" label="commit message" v-model:value="pomodoro.message"></v-textarea>
      </v-flex>
    </v-layout row wrap>
  </v-container>
</template>

<script lang='ts'>
import firebase from 'firebase';
import fs from 'fs';
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import {
  Header,
} from '@/views';

@Component({
  components: {
    Header,
  },
})
export default class Note extends Vue {
  get pomodoro() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.timestamp === this.$route.params.timestamp)[0];
  }
  public updated() {
    this.$store.dispatch('pomodoroList/dump');
  }
}
</script>
