<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        {{ $store.state.config}}
      </v-list>
      <v-list>
        {{ $store.state.pomodoroSeries }}
      </v-list>
    </v-navigation-drawer>
    <Header />
    <v-content>
      <v-btn @click='notice'>notice</v-btn>
      <v-container fluid>
        <router-view></router-view>
        <TablePomodoro :pomodoros="pomodoros" />
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
import TablePomodoro from '@/components/TablePomodoro.vue';
import {
  Header,
} from '@/views';
import {
  recordPath,
} from '@/store';
import path from 'path';
// import { Notification, } from 'electron';


@Component({
  components: {
    Header,
    TablePomodoro,
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

  public notice(e) {
    const options = [{
        title: 'Basic Notification',
        body: 'Short message part',
      },
      {
        title: 'Content-Image Notification',
        body: 'Short message plus a custom content image',
        icon: path.join(__dirname, 'icon.png'),
      },
    ];

    new(window as any).Notification('hweelo', {
      title: 'Basic Notification',
      body: 'Short message part',
    });
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
