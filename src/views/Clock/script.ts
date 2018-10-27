import moment from 'moment';
import marked from 'marked';
import {
  Component,
  Vue,
  Watch,
} from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import Timer from '@/components/Timer.vue';
import TablePomodoro from '@/components/TablePomodoro.vue';



const sleep = (sec) => new Promise((r) => setTimeout(r, sec * 1000));
const pos = (n) => n < 0 ? 0 : n;
const to60 = (n) => n < 0 ? 59 : n;

@Component({
  components: {
    Timer,
    TablePomodoro,
    VueMarkdown,
  },
})
export default class Home extends Vue {
  get pomodoroList() {
    const yesterday = moment().subtract(1, 'days');
    return this.$store.state.pomodoroList.all
      .filter((p) =>  moment(p.timestamp).isAfter(yesterday));
  }
  get lastPomodoro() {
    return this.pomodoroList
      .filter((a) => a.color !== 'white')
      .slice(-1)[0];
  }
  get endPomodoro() {
    return this.pomodoroList.slice(-1)[0];
  }
  get compiledMarkdown() {
    return marked(this.lastPomodoro.message, {
      sanitize: true,
    });
  }
  get timer() {
    return this.$store.state.timer;
  }
  get timeup() {
    const timer = this.$store.state.timer;
    return timer.min <= 0 && timer.sec <= 0;
  }
  get color() {
    return !this.$store.state.pomodoroSeries.takeRest ? 'green' : 'red';
  }
  get policy() {
    const config = this.$store.state.pomodoroSeries.config;
    const count = this.$store.state.pomodoroSeries.count;

    return !this.$store.state.pomodoroSeries.takeRest ? 'focus' :
      count < config.maxSeries - 1 ? 'takeShortRest' : 'takeLongRest';
  }
  get progress() {
    const timer = this.$store.state.timer;
    const config = this.$store.state.pomodoroSeries.config;
    const a = moment.duration( {
      minutes: timer.min,
      seconds: timer.sec,
    });
    const b =
      this.policy === 'focus' ?
        moment.duration( {
          minutes: config.shortRest.min,
          seconds: config.shortRest.sec,
        })
      : this.policy === 'takeShortRest' ?
        moment.duration( {
          minutes: config.focus.min,
          seconds: config.focus.sec,
        })
      :
        moment.duration( {
          minutes: config.longRest.min,
          seconds: config.longRest.sec,
        });
    // return 100 * (1 - a / b);
    return;
  }


  @Watch('timeup')
  public async onTimeupChange(isTimeup, oldVal) {
    if (!isTimeup) {
      return;
    }

    const msg  =
      this.policy === 'focus' ? 'Focus' :
      this.policy === 'takeShortRest' ? 'Take short rest' :
      'Take long rest';
    new(window as any).Notification('timeup', {
      body: msg,
    });

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
    const config = this.$store.state.pomodoroSeries.config;

    switch (this.policy) {
      case 'focus':
        this.$store.dispatch('timer/setTimer', {
          min: pos(config.focus.min - 1),
          sec: to60(config.focus.sec - 1),
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
          min: pos(config.shortRest.min - 1),
          sec: to60(config.shortRest.sec - 1),
        });
        this.$store.dispatch('pomodoroSeries/setTakeRest', false);
        break;
      case 'takeLongRest':
        this.$store.dispatch('timer/setTimer', {
          min: pos(config.longRest.min - 1),
          sec: to60(config.longRest.sec - 1),
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
    const config = this.$store.state.pomodoroSeries.config;
    this.$store.dispatch('timer/pause');
    this.$store.dispatch('timer/setTimer', {
      min: config.focus.min,
      sec: config.focus.sec,
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
    this.$store.dispatch('pomodoroSeries/setTakeRest', true);
  }
}
