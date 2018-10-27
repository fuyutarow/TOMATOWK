<template>
  <v-container style='padding:0'>
    <v-layout>
      <v-flex>
        <p> {{ datetime }} </p>
        <Editor v-model="pomodoro.message" />
      </v-flex>
    </v-layout row wrap>
  </v-container>
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  Watch,
} from 'vue-property-decorator';
import Editor from '@/components/Editor/index.vue';


@Component({
  components: {
    Editor,
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

  @Watch('pomodoro.message')
  public save() {
    this.$store.dispatch('pomodoroList/dump');

  }
}
</script>
