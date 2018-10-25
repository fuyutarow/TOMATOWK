<template>
  <v-app>
    <v-navigation-drawer app>
      {{ $store.state}}
    </v-navigation-drawer>
    <Header />
    <v-content>
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
import fs from 'fs';
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import TablePomodoro from '@/components/TablePomodoro.vue';
import {
  Header,
} from '@/views';

@Component({
  components: {
    Header,
    TablePomodoro,
  },
})
export default class App extends Vue {
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

  public dump() {
    const table = this.$store.state.timer.pomodoroTable;
    const json = JSON.stringify({
      table,
    }, null, 4);
    fs.writeFile(this.recordPath, json, 'utf8', (error) => {});
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
    this.$store.dispatch('timer/pause');
    this.$store.dispatch('timer/setTimer', {
      min: Number(process.env.VUE_APP_DEFAULT_FOCUS_MINITUES),
      sec: Number(process.env.VUE_APP_DEFAULT_FOCUS_SECONDS),
    });
  }
}
</script>
