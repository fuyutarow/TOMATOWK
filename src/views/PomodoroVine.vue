<template>
  <v-card color="transparent">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <template v-for="pomodoro in pomodoros">
          <v-flex xs12>
            <PomodoroCard :pomodoro="pomodoro" />
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
import PomodoroCard from '@/components/PomodoroCard/index.vue';
import VueMarkdown from 'vue-markdown';
import Editor from '@/components/Editor/index.vue';


@Component({
  components: {
    PomodoroCard,
    VueMarkdown,
    Editor,
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
}
</script>
