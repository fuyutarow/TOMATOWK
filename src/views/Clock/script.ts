import {
  Component,
  Vue,
  Watch,
} from 'vue-property-decorator';
import Timer from '@/components/Timer.vue';


const sleep = (sec) => new Promise((r) => setTimeout(r, sec * 1000));
const pos = (n) => n < 0 ? 0 : n;
const to60 = (n) => n < 0 ? 59 : n;

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
  get endPomodoro() {
    return this.pomodoroList.slice(-1)[0];
  }
  get timer() {
    return this.$store.state.timer;
  }
  get timeup() {
    const timer = this.$store.state.timer;
    return timer.min <= 0 && timer.sec <= 0;
  }
  get pomodoroConfig() {
    return this.$store.state.pomodoroSeries.config;
  }
  get policy() {
    return !this.$store.state.pomodoroSeries.takeRest ? 'focus' :
      this.$store.state.pomodoroSeries.count < this.pomodoroConfig.maxSeries - 1 ? 'takeShortRest' : 'takeLongRest';
  }

  @Watch('timeup')
  public async onTimeupChange(isTimeup, oldVal) {
    if (!isTimeup) {
      return;
    }

    if (this.endPomodoro.color === 'white') {
      this.$store.dispatch('pomodoroList/popWhite');
      this.$store.dispatch('pomodoroList/lastPatch', {
        blank: false,
      });
      this.$store.dispatch('pomodoroList/pushWhite');

    } else {
      this.$store.dispatch('pomodoroList/lastPatch', {
        blank: false,
      });
    }

    await sleep(1);
    this.setTimer();
  }

  public setTimer() {
    switch (this.policy) {
      case 'focus':
        this.$store.dispatch('timer/setTimer', {
          min: pos(this.pomodoroConfig.focus.min - 1),
          sec: to60(this.pomodoroConfig.focus.sec - 1),
        });
        this.$store.dispatch('pomodoroList/push', {
          color: 'red',
          blank: true,
        });
        this.$store.dispatch('pomodoroSeries/setTakeRest', true);
        break;
      case 'takeShortRest':
        this.$store.dispatch('pomodoroSeries/increment');
        this.$store.dispatch('timer/setTimer', {
          min: pos(this.pomodoroConfig.shortRest.min - 1),
          sec: to60(this.pomodoroConfig.shortRest.sec - 1),
        });
        this.$store.dispatch('pomodoroSeries/setTakeRest', false);
        break;
      case 'takeLongRest':
        this.$store.dispatch('timer/setTimer', {
          min: pos(this.pomodoroConfig.longRest.min - 1),
          sec: to60(this.pomodoroConfig.longRest.sec - 1),
        });
        this.$store.dispatch('pomodoroList/push', {
          color: 'green',
          blank: true,
        });
        this.$store.dispatch('pomodoroList/pushWhite');
        this.$store.dispatch('pomodoroSeries/setTakeRest', false);
        this.$store.dispatch('pomodoroSeries/reset');
        break;
    }
    this.$store.dispatch('timer/play');
  }

  public play() {
    this.$store.dispatch('timer/play');
    const lastIsBlankRed = !this.lastPomodoro ? false :
      this.lastPomodoro.blank && this.lastPomodoro.color === 'red';
    const isWhiteEnd = this.endPomodoro.color === 'white';
    if (lastIsBlankRed && !isWhiteEnd) {
      return;
    }

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
    const isWhiteEnd = this.endPomodoro.color === 'white';
    if (isWhiteEnd) {
      return;
    }

    if (this.lastPomodoro.color === 'red' && this.lastPomodoro.blank) {
      this.$store.dispatch('pomodoroList/lastPatch', {
        color: 'yellow',
        blank: false,
      });
    }
    this.$store.dispatch('pomodoroList/pushWhite');
    this.$store.dispatch('pomodoroList/dump');
    this.$store.dispatch('pomodoroSeries/reset');
  }
}
