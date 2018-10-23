<template>
  <v-data-table :headers="headers" :items="pomodoros" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.timestamp }}</td>
      <td class="text-xs-right">{{ props.item.color }}</td>
      <td class="text-xs-right">{{ props.item.message }}</td>
    </template>
  </v-data-table>
</template>

<script lang='ts'>
import {
  Component,
  Vue,
} from 'vue-property-decorator';


@Component({})
export default class PomodoroList extends Vue {
  get pomodoros() {
    return this.$store.state.pomodoroList.all;
  }
  get headers() {
    return [{
        text: 'timestamp',
        value: 'timestamp',
      },
      {
        text: 'Color',
        value: 'color',
      },
      {
        text: 'message',
        value: 'message',
      },
    ];
  }
}
</script>
