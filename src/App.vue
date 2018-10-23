<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <Header />
    <v-content>
      <v-btn @click='dump'>dump</v-btn>
      <v-btn @click='read'>read</v-btn>
      <TablePomodoro :pomodoros="pomodoros" />
      <v-container fluid>
        <router-view></router-view>
        {{ pomodoros}}
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
  get pomodoros() {
    return this.$store.state.pomodoroList.all;
  }
  public created() {
    const table = this.readTable();
    this.$store.state.timer.pomodoroTable = table;
    this.pushWhitePomodoro();
  }
  public dump() {
    const table = this.$store.state.timer.pomodoroTable;
    const json = JSON.stringify({
      table,
    }, null, 4);
    fs.writeFile('./record.json', json, 'utf8', (error) => {});
  }
  public readTable() {
    const json = JSON.parse(fs.readFileSync('./record.json', 'utf-8'));
    return json.table;
  }
  public pushWhitePomodoro() {
    const pomodoro = {
      color: 'white',
    };
    this.$store.dispatch('pomodoroList/push', pomodoro);
  }
}
</script>
