<template>
  <v-app>
    <v-navigation-drawer app>
    </v-navigation-drawer>
    <Header />
    <v-content>
      <v-container fluid style="padding:0">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang='ts'>
import firebase from 'firebase';
import {
  Component,
  Vue,
  Watch,
} from 'vue-property-decorator';
import {
  Header,
} from '@/views';
import {
  recordPath,
} from '@/store';


@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
  get fpath() {
    return recordPath;
  }
  get recordPath() {
    return './record.json';
  }
  get pomodoros() {
    return this.$store.state.pomodoroList.all;
  }
  get lastPomodoro() {
    return this.pomodoros
      .filter((a) => a.color !== 'white')
      .slice(-1)[0];
  }

  public created() {
    this.initTimer();
    this.initPomodoroList();
  }

  public mounted() {
    const shell = require('electron').shell;
    document.addEventListener('click', (event: any) => {
      if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
        event.preventDefault();
        shell.openExternal(event.target.href);
      }
    });
  }

  public initPomodoroList() {
    this.$store.dispatch('pomodoroList/load');
    if (this.lastPomodoro.color === 'red' && this.lastPomodoro.blank) {
      this.$store.dispatch('pomodoroList/lastPatch', {
        color: 'yellow',
        blank: false,
      });
    }
    this.$store.dispatch('pomodoroList/pushWhite');
  }

  public initTimer() {
    const config = this.$store.state.pomodoroSeries.config;

    this.$store.dispatch('timer/pause');
    this.$store.dispatch('timer/setTimer', {
      min: config.focus.min,
      sec: config.focus.sec,
    });
  }

  get policy() {
    const config = this.$store.state.pomodoroSeries.config;
    const count = this.$store.state.pomodoroSeries.count;

    return !this.$store.state.pomodoroSeries.takeRest ? 'focus' :
      count < config.maxSeries - 1 ? 'takeShortRest' : 'takeLongRest';
  }

  get progress() {
    const moment = require('moment');

    const timer = this.$store.state.timer;
    const config = this.$store.state.pomodoroSeries.config;
    const a = moment.duration({
      minutes: timer.min,
      seconds: timer.sec,
    });
    const b =
      this.policy === 'focus' ?
      moment.duration({
        minutes: config.shortRest.min,
        seconds: config.shortRest.sec,
      }) :
      this.policy === 'takeShortRest' ?
      moment.duration({
        minutes: config.focus.min,
        seconds: config.focus.sec,
      }) :
      moment.duration({
        minutes: config.longRest.min,
        seconds: config.longRest.sec,
      });
    // return 100 * (1 - a / b);
    return;
  }

  get endPomodoro() {
    return this.$store.state.pomodoroList.all
      .slice(-1)[0];
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

    const msg =
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

    const sleep = (sec) => new Promise((r) => setTimeout(r, sec * 1000));
    await sleep(1);
    this.setTimer();
  }

  public setTimer() {
    const config = this.$store.state.pomodoroSeries.config;
    const pos = (n) => n < 0 ? 0 : n;
    const to60 = (n) => n < 0 ? 59 : n;

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
}
</script>
