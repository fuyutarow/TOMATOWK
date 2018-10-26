<template>
  <v-container>
    <v-layout>
      <v-flex>
        <p>{{ datetime }}</p>
        <!--
          <v-textarea solo name="input-7-4" label="commit message" v-model:value="pomodoro.message"></v-textarea>
        <textarea v-model:value="pomodoro.message" :style="style" @input='input'></textarea>
        -->
        <textarea :value="pomodoro.message" :style="style" @input='input' @keydown.tab.prevent="tabber"></textarea>
        <div v-html="compiledMarkdown"></div>
      </v-flex>
      <v-flex>
        <div>{{ compiledMarkdown }}</div>
        <div>{{ pomodoro.message }}</div>
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


@Component({})
export default class Note extends Vue {
  public width = 400; // px
  public height = 200; // px
  public lineHeight = 20; // px

  get compiledMarkdown() {
    return marked(this.pomodoro.message, {
      sanitize: true,
    });
  }
  get style() {
    return {
      'height': `${this.height}px`,
      'width': `${this.width}px`,
      'line-height': `${this.lineHeight}px`,
      'padding': '8px',
    };
  }
  get datetime() {
    const timestamp = this.$route.params.timestamp;
    return timestamp;
  }
  get pomodoro() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.timestamp === this.$route.params.timestamp)[0];
  }
  public tabber(event) {
    if (event) {
      event.preventDefault();
      const text = this.pomodoro.message;
      const startText = text.slice(0, event.target.selectionStart);
      const endText = text.slice(event.target.selectionStart);
      this.pomodoro.message = `${startText}\t${endText}`;
      event.target.selectionEnd = event.target.selectionStart + 1;
    }
  }
  public input(e) {
    if (!e.target.composing) {
      this.pomodoro.message = e.target.value;
    }

    const autosizeHeight = (text, lineHeight) => {
      const nLines = text.match(/\n/g).length;
      return lineHeight * nLines;
    };
    const text = this.pomodoro.message;
    this.height = autosizeHeight(text, this.lineHeight);
  }
  public updated() {
    this.$store.dispatch('pomodoroList/dump');
  }
}
</script>
