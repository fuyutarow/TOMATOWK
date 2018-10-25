<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <Timer />
      </v-flex>
      <v-flex mb-4>
        <v-btn @click="stop" fab dark>
          <i class="material-icons">stop</i>
        </v-btn>
        <template v-if="timer.inPause">
          <v-btn @click="play" fab dark>
            <i class="material-icons">play_arrow</i>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="pause" fab dark>
            <i class="material-icons">pause</i>
          </v-btn>
        </template>
        <v-btn fab dark :to="{
          name: 'pomodoroDetail',
          params: { timestamp: lastPomodoro.timestamp},
          }">
          <v-icon class="material-icons">create</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import Timer from '@/components/Timer.vue';

@Component({
  components: {
    Timer,
  },
})
export default class Home extends Vue {
  get pomodoroList() {
    return this.$store.state.pomodoroList.all;
  }
  get lastPomodoro() {
    return (this.pomodoroList.length < 2) ? this.pomodoroList[0] :
      this.pomodoroList
      .filter((a) => a.color !== 'white')
      .reduceRight((a) => a);
  }
  get timer() {
    return this.$store.state.timer;
  }
  public play() {
    this.$store.dispatch('timer/play');
  }
  public pause() {
    this.$store.dispatch('timer/pause');
  }
  public stop() {
    this.$store.dispatch('timer/pause');
    this.$store.dispatch('timer/setTimer', {
      min: Number(process.env.VUE_APP_DEFAULT_FOCUS_MINITUES),
      sec: Number(process.env.VUE_APP_DEFAULT_FOCUS_SECONDS),
    });
  }
}
</script>
