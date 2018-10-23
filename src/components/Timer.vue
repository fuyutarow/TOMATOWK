<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <h1 style="font-size:100px">
          {{ formatTime }}
        </h1>
      </v-flex>
      <v-flex mb-4>
        <v-btn @click="stop" fab dark>
          <v-icon class="material-icons">stop</v-icon>
        </v-btn>
        <template v-if="freeze">
          <v-btn @click="start" fab dark>
            <v-icon class="material-icons">play_arrow</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="pause" fab dark>
            <v-icon class="material-icons">pause</v-icon>
          </v-btn>
        </template>
        {{ timer }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import moment from 'moment';
import {
  Component,
  Vue,
} from 'vue-property-decorator';


@Component({
  components: {},
})
export default class Timer extends Vue {
  public freeze = true;
  public maxSeries = 3;
  public focusMinutes = 2;
  public restMinutes = 1;

  get timer() {
    return this.$store.state.timer;
  }
  get formatTime() {
    return [
        this.timer.min,
        this.timer.sec,
      ]
      .map((v) => v.toString())
      .map((str) => (str.length < 2) ? '0' + str : str)
      .join(':');
  }
  public created() {
    this.stop();
  }
  public start() {
    const self = this;
    const timerObj = setInterval(() => {
      this._routine();
    }, 1000);
    this.$store.dispatch('timer/setTimerObj', timerObj);
    this.freeze = false;
  }
  public pause() {
    this.$store.dispatch('timer/clearTimerObj');
    this.freeze = true;
  }
  public stop() {
    this.$store.dispatch('timer/clearTimerObj');
    this.$store.dispatch('timer/setTimer', {
      // mm: this.focusMinutes,
      // ss: 0,
      mm: 0,
      ss: 10,
    });
    this.$store.dispatch('timer/resetSeries');
  }
  public _routine() {
    if (!this.timer.isCountUp) {
      this.$store.dispatch('timer/countDown');
      return;
    } else if (this.timer.isRest) {
      this.$store.dispatch('timer/setIsRest', false);
      this.$store.dispatch('timer/setTimer', {
        // mm: this.focusMinutes,
        // ss: 59,
        mm: 0,
        ss: 9,
      });
    } else {
      this.$store.dispatch('timer/setIsRest', true);
      this.$store.dispatch('timer/setTimer', {
        // mm: this.focusMinutes,
        // ss: 59,
        mm: 0,
        ss: 4,
      });
    }
    this.$store.dispatch('timer/incrementSeries');

    const color = (this.timer.nSeries < this.maxSeries) ? 'red' : 'green';
    const pomodoro = {
      timestamp: moment().unix(),
      message: '',
      color,
    };
    this.$store.dispatch('timer/pushPomodoroTable', pomodoro);

    if (this.timer.nSeries >= 3) {
      this.$store.dispatch('timer/resetSeries');
    }
  }
}
</script>

<style>

</style>
