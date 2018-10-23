import {
  Component,
  Vue,
} from 'vue-property-decorator';


@Component({
  components: {},
})
export default class Timer extends Vue {
  public freeze = true;
  public maxSeries = 5;
  public focusMinutes = 25;
  public shortRestMinutes = 5;
  public longRestMinutes = 15;
  public tobe = 'takeShortRest';

  get timer() {
    return this.$store.state.timer;
  }
  get pomodoroList() {
     return this.$store.state.pomodoroList.all;
  }
  get lastPomodoro() {
    return ( this.pomodoroList.length < 2) ? this.pomodoroList[0] :
      this.pomodoroList
        .filter((a) => a.color !== 'white')
        .reduceRight((a) => a);
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
    const timerObj = setInterval(() => {
      this._routine();
    }, 1000);
    this.$store.dispatch('timer/setTimerObj', timerObj);
    this.$store.dispatch('pomodoroList/push', {color: 'red', blank: true});
    this.freeze = false;
  }
  public pause() {
    this.$store.dispatch('timer/clearTimerObj');
    this.freeze = true;
  }
  public stop() {
    this.freeze = true;
    this.$store.dispatch('timer/clearTimerObj');
    this.$store.dispatch('timer/setTimer', {
      mm: this.focusMinutes,
      ss: 0,
    });

    const popPomodoro = this.$store.state.pomodoroList.all.pop();
    if (popPomodoro.color === 'red' && popPomodoro.blank) {
      this.$store.dispatch('pomodoroList/push', {color: 'yellow'});
      this.$store.dispatch('pomodoroList/push', {color: 'white'});
    } else if (popPomodoro.color === 'red') {
      this.$store.dispatch('pomodoroList/push', popPomodoro);
      this.$store.dispatch('pomodoroList/push', {color: 'white'});
    } else {
      this.$store.dispatch('pomodoroList/push', {color: 'white'});
    }
    this.$store.dispatch('timer/resetSeries');
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
          mm: this.focusMinutes - 1,
          ss: 59,
        });
        this.$store.dispatch('pomodoroList/push', {color: 'red', blank: true});
        if (this.timer.nSeries === 0 ) {
          this.$store.dispatch('pomodoroList/pop');
          this.$store.dispatch('pomodoroList/pop');
          this.$store.dispatch('pomodoroList/push', {color: 'green'});
          this.$store.dispatch('pomodoroList/push', {color: 'white'});
          this.$store.dispatch('pomodoroList/push', {color: 'red', blank: true});
          this.tobe = 'takeShortRest';
        } else if (this.timer.nSeries < this.maxSeries - 1) {
          this.tobe = 'takeShortRest';
        } else {
          this.tobe = 'takeLongRest';
        }
        return;
      case 'takeShortRest':
        this.$store.dispatch('timer/setTimer', {
          mm: this.shortRestMinutes - 1,
          ss: 59,
        });
        this.$store.dispatch('pomodoroList/pop');
        this.$store.dispatch('pomodoroList/push', {color: 'red'});
        this.$store.dispatch('timer/incrementSeries');
        break;
      case 'takeLongRest':
        this.$store.dispatch('timer/resetSeries');
        this.$store.dispatch('timer/setTimer', {
          mm: this.longRestMinutes - 1,
          ss: 59,
        });
        this.$store.dispatch('pomodoroList/pop');
        this.$store.dispatch('pomodoroList/push', {color: 'red'});
        this.$store.dispatch('pomodoroList/push', {color: 'green', blank: true});
        this.$store.dispatch('timer/resetSeries');
        break;
    }
    this.tobe = 'focus';
  }

}
