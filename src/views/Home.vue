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
        <template v-if="this.lastPomodoro">
          <v-btn fab dark :to="{
          name: 'pomodoroDetail',
          params: { timestamp: lastPomodoro.timestamp},
          }">
            <v-icon class="material-icons">create</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn fab dark disable>
            <v-icon class="material-icons">create</v-icon>
          </v-btn>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
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
    return this.pomodoroList
      .filter((a) => a.color !== 'white')
      .slice(-1)[0];
  }
  get timer() {
    return this.$store.state.timer;
  }
  get timeup() {
    const timer = this.$store.state.timer;
    return timer.min <= 0 && timer.sec <= 0;
  }
  @Watch('timeup')
  public async onTimeupChange(isTimeup, oldVal) {
    if (!isTimeup) {
      return;
    }

    this.$store.dispatch('pomodoroList/lastPatch', {
      blank: false,
    });

    const sleep = (sec) => new Promise((r) => setTimeout(r, sec * 1000));
    await sleep(1);

    const pos = (n) => n < 0 ? 0 : n;
    const to60 = (n) => n < 0 ? 59 : n;
    this.$store.dispatch('timer/setTimer', {
      min: pos(Number(process.env.VUE_APP_DEFAULT_FOCUS_MINITUES) - 1),
      sec: to60(Number(process.env.VUE_APP_DEFAULT_FOCUS_SECONDS) - 1),
    });
    this.$store.dispatch('timer/play');
    this.$store.dispatch('pomodoroList/push', {
      color: 'red',
      blank: true,
    });
  }
  public play() {
    this.$store.dispatch('timer/play');
    this.$store.dispatch('pomodoroList/push', {
      color: 'red',
      blank: true,
    });
    this.$store.dispatch('pomodoroList/dump');
  }
  public pause() {
    this.$store.dispatch('timer/pause');
    this.$store.dispatch('pomodoroList/dump');
  }
  public stop() {
    this.$store.dispatch('timer/pause');
    this.$store.dispatch('timer/setTimer', {
      min: Number(process.env.VUE_APP_DEFAULT_FOCUS_MINITUES),
      sec: Number(process.env.VUE_APP_DEFAULT_FOCUS_SECONDS),
    });
    this.$store.dispatch('pomodoroList/push', {
      color: 'white',
    });
    this.$store.dispatch('pomodoroList/dump');
  }
}
</script>
