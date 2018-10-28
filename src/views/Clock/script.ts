import moment from 'moment';
import marked from 'marked';
import {
  Component,
  Vue,
  Watch,
} from 'vue-property-decorator';
import Timer from '@/components/Timer.vue';
import TablePomodoro from '@/components/TablePomodoro.vue';
import VueMarkdown from 'vue-markdown';



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
  get timer() {
    return this.$store.state.timer;
  }
  get color() {
    return !this.$store.state.pomodoroSeries.takeRest ? 'green' : 'red';
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
