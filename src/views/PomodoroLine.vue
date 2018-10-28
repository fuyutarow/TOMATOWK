<template>
  <v-container>
    <v-timeline dense clipped>
      <v-timeline-item color="red darken-1" fill-dot left small>
        <v-layout justify-space-between>
          <v-flex>
            <v-card class="elevation-2" xs7>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs5 text-xs-right>DO))O0000OOO</v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="red darken-1" fill-dot left small>
        <v-layout justify-space-between>
          <v-flex>
            <v-card class="elevation-2" xs7>
              <v-card-text>
                <VueMarkdown :source="last.message" />
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs5 text-xs-right>{{moment(last.timestamp).fromNow()}}</v-flex>
        </v-layout>
      </v-timeline-item>

      <template v-for="pomodoro in pomodoros">
        <VineItem :pomodoro="pomodoro" />
      </template>

      <template v-for="pomodoro in pomodoros">
        <v-timeline-item :color="`${pomodoro.color} darken-1`" fill-dot left small>
          <v-layout justify-space-between>
            <v-flex xs7>
              <VueMarkdown :source="pomodoro.message" />
            </v-flex>
            <v-flex xs5 text-xs-right>{{moment(pomodoro.timestamp).fromNow()}}</v-flex>
          </v-layout>
        </v-timeline-item>
      </template>

    </v-timeline>
  </v-container>
</template>

<script lang='ts'>
import moment from 'moment';
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import Pomodot from '@/components/Pomodot.vue';
import VueMarkdown from 'vue-markdown';
import Editor from '@/components/Editor/index.vue';
import VineItem from '@/components/VineItem.vue';

@Component({
  components: {
    Pomodot,
    VueMarkdown,
    Editor,
    VineItem
  },
})
export default class PomodoroList extends Vue {
  get moment() {
    return moment;
  }
  get pomodoros() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.color !== 'white')
      .reverse();
  }
  get last() {
    return this.pomodoros.slice(0)[0];
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
