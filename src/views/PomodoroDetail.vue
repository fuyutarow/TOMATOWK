<template>
  <v-container>
    <v-layout>
      <v-flex>
        <p> {{ datetime }} </p>
        <Editor />
      </v-flex>
    </v-layout row wrap>
  </v-container>
</template>

<script lang='ts'>
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import marked from 'marked';
import Editor from '@/components/Editor/index.vue';


@Component({
  components: {
    Editor,
  },
})
export default class Note extends Vue {
  public lineHeight = 20; // px

  get datetime() {
    const timestamp = this.$route.params.timestamp;
    return timestamp;
  }
  get pomodoro() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.timestamp === this.$route.params.timestamp)[0];
  }
  get compiledMarkdown() {
    return marked(this.pomodoro.message, {
      sanitize: true,
    });
  }

  // public updated() {
  //   this.$store.dispatch('pomodoroList/dump');
  // }
}
</script>
