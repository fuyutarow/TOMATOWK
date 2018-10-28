<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>

          <v-card class="elevation-2">
            <v-card-text>
              <VueMarkdown :source="last.message" />
            </v-card-text>
          </v-card>
        </v-flex>

        <template v-for="pomodoro in pomodoros">
          <v-flex xs12>
            <VineItem :pomodoro="pomodoro" />
          </v-flex>
        </template>
      </v-layout>

    </v-container>
  </v-card>

</template>

<script lang='ts'>
import moment from 'moment';
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import Editor from '@/components/Editor/index.vue';
import VineItem from '@/components/VineItem.vue';

@Component({
  components: {
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
