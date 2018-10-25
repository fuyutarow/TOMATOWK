<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <Header />
    <v-content>
      <v-btn @click='dump'>dump</v-btn>
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
    if (!fs.existsSync(this.recordPath)) {
      return;
    }

    const json = JSON.parse(fs.readFileSync(this.recordPath, 'utf-8'));
    const pomodoros = json.table;
    if (pomodoros) {
      this.$store.dispatch('pomodoroList/load', pomodoros);
    }
    this.$store.dispatch('pomodoroList/push', {
      color: 'white',
    });
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
