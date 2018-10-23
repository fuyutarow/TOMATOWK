<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-textarea solo name="input-7-4" label="commit message" v-model:value="lastPomodoro.message"></v-textarea>
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
  get lastPomodoro() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.color === 'red')
      .reduceRight((a) => a);
  }
  public updated() {
    this.$store.dispatch('pomodoroList/dump');

  }
}
</script>
