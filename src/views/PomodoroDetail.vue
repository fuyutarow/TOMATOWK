<template>
  <v-container>
    <v-layout>
      <v-flex>
        <p>{{ datetime }}</p>
        <v-textarea solo name="input-7-4" label="commit message" v-model:value="pomodoro.message"></v-textarea>
      </v-flex>
    </v-layout row wrap>
  </v-container>
</template>

<script lang='ts'>
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component({})
export default class Note extends Vue {
  get datetime() {
    const timestamp = this.$route.params.timestamp;
    return timestamp;
  }
  get pomodoro() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.timestamp === this.$route.params.timestamp)[0];
  }
  public updated() {
    this.$store.dispatch('pomodoroList/dump');
  }
}
</script>
