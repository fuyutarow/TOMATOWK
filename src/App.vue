<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        {{ $store.state.config}}
      </v-list>
      <v-list>
        {{ $store.state.pomodoroSeries }}
      </v-list>
      <v-list>
        {{ $store.state.pomodoroList }}
      </v-list>
    </v-navigation-drawer>
    <Header />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang='ts'>
import firebase from 'firebase';
import {
  Component,
  Vue,
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
}
</script>
