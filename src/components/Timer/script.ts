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
  public tobe = 'takeShortRest';

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
      mm: 0,
      ss: 10,
    });
    this.$store.dispatch('timer/resetSeries');
    this.freeze = true;
    this.tobe = 'takeShortRest';
  }
  public _routine() {
    if (!this.timer.isCountUp) {
      this.$store.dispatch('timer/countDown');
      return;
    }

    switch (this.tobe) {
      case 'focus':
        this.$store.dispatch('timer/setTimer', {
          mm: 0,
          ss: 9,
        });
        this.tobe = (this.timer.nSeries < this.maxSeries) ? 'takeShortRest' : 'takeLongRest';
        if ( this.timer.nSeries >= this.maxSeries) {
          this.$store.dispatch('timer/resetSeries');
          this.pushGreenPomodoro();
        }
        return;
      case 'takeShortRest':
        this.$store.dispatch('timer/setTimer', {
          mm: 0,
          ss: 4,
        });
        break;
      case 'takeLongRest':
        this.$store.dispatch('timer/setTimer', {
          mm: 0,
          ss: 20,
        });
        break;
    }
    this.$store.dispatch('timer/incrementSeries');
    this.pushRedPomodoro();
    this.tobe = 'focus';
  }

  public pushRedPomodoro() {
    const pomodoro = {
      timestamp: moment().unix(),
      message: '',
      color: 'red',
    };
    this.$store.dispatch('timer/pushPomodoroTable', pomodoro);
  }

  public pushGreenPomodoro() {
    const pomodoro = {
      timestamp: moment().unix(),
      message: '',
      color: 'green',
    };
    this.$store.dispatch('timer/pushPomodoroTable', pomodoro);
  }
}
