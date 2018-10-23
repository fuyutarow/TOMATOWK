<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <Header />
    <v-content>
      <v-btn @click='dump'>dump</v-btn>
      <v-btn @click='read'>read</v-btn>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang='ts'>
import firebase from 'firebase';
import fs from 'fs';
import csv from 'csv';
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import {
  Header,
} from '@/views';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
  public dump() {
    const table = this.$store.state.timer.pomodoroTable;
    const json = JSON.stringify({
      table,
    }, null, 4);
    fs.writeFile('./record.json', json, 'utf8', (error) => {});
  }
  public read() {
    const json = JSON.parse(fs.readFileSync('./record.json', 'utf-8'));
    const table = json.table;
  }
}
</script>
