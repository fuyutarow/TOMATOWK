<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <h1 style="font-size:100px">
          {{ formatTime }}
        </h1>
      </v-flex>
      <v-flex mb-4>
        <template v-if="freeze">
          <v-btn @click="start" fab dark>
            <i class="material-icons">play_arrow</i>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="stop" fab dark>
            <i class="material-icons">pause</i>
          </v-btn>
        </template>
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
  public timerObj: any = null;

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
  public start() {
    const self = this;
    this.timerObj = setInterval(() => {
      this.count()
    }, 1000);
    this.freeze = false;
  }
  public stop() {
    clearInterval(this.timerObj);
    this.freeze = true;
  }
  public complete() {
    clearInterval(this.timerObj);
  }
  public count() {
    const initMin = 1;
    const _state = this.timer;
    if (_state.sec <= 0 && _state.min >= 1) {
      _state.min--;
      _state.sec = 59;
    } else if (_state.sec <= 0 && _state.min <= 0) {
      clearInterval(_state.timerObj);
      const pomodoro = {
        timestamp: moment().unix(),
        message: '',
        color: 'red',
      };
      _state.pomodoroTable.push(pomodoro);
      this.$store.dispatch('timer/setTimer')
    } else {
      _state.sec--;
    }
  }
}
</script>

<style>

</style>
