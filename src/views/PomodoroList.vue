<template>
  <v-data-table :headers="headers" :items="pomodoros" :pagination.sync="pagination" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <router-link tag="tr" :to="{ name: 'pomodoroDetail', params: { timestamp: props.item.timestamp}}">
        <td>
          {{ moment(props.item.timestamp).format("YYYY-MM-DD HH:mm:ss") }}
          <Pomodot :color="props.item.color" :blank="props.item.blank" />
        </td>
        <td class="text-xs-left">{{ props.item.message }}</td>
      </router-link>
    </template>
  </v-data-table>
</template>

<script lang='ts'>
import moment from 'moment';
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import Pomodot from '@/components/Pomodot.vue';

@Component({
  components: {
    Pomodot,
  },
})
export default class PomodoroList extends Vue {
  get moment() {
    return moment;
  }
  get pomodoros() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.color !== 'white');
  }
  get pagination() {
    return {
      sortBy: 'timestamp',
      descending: true,
      rowsPerPage: -1,
    };
  }
  get headers() {
    return [{
        text: 'timestamp',
        value: 'timestamp',
      },
      {
        text: 'message',
        value: 'message',
      },
    ];
  }
}
</script>
