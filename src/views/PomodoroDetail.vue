<template>
  <div>
    <v-card color="transparent">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <PomodoroCard :pomodoro="pomodoro" :setDone='false' />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div style="text-align: center;">
      <v-btn :to="{ name: 'vine' }" slot="activator" color="orange" small flat dark>
        more
      </v-btn>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  Watch,
} from 'vue-property-decorator';
import PomodoroCard from '@/components/PomodoroCard/index.vue';


@Component({
  components: {
    PomodoroCard,
  },
})
export default class Note extends Vue {
  get datetime() {
    const timestamp = this.$route.params.timestamp;
    return timestamp;
  }
  get pomodoro() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.timestamp === this.$route.params.timestamp)[0];
  }
}
</script>
