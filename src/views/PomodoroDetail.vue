<template>
  <v-container>
    <v-layout>
      <v-flex>
        <p>{{ datetime }}</p>
        <!--
          <v-textarea solo name="input-7-4" label="commit message" v-model:value="pomodoro.message"></v-textarea>
        <textarea v-model:value="pomodoro.message" :style="style" @input='input'></textarea>
        -->
        <textarea :value="pomodoro.message" :style="style" @input='input' @keydown.tab.prevent="tabber" @keydown.enter.prevent="enterer"></textarea>
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
      'padding': '20px',
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
  public enterer(event) {
    if (event) {
      event.preventDefault();
      const text = this.pomodoro.message;
      const cIndex = event.target.selectionStart;
      const startText = text.slice(0, event.target.selectionStart);
      const endText = text.slice(event.target.selectionStart);
      const nowLine = startText.split('\n').slice(-1)[0]
      const isLi: any = nowLine.split(/\s/)[0].match(/-|\*/)
      if (isLi) {
        const msg = `${startText}\n  ${isLi.input} ${endText}`;
        this.pomodoro.message = msg;
        console.log(msg, event)
      } else {
        const msg = `${startText}\n${endText}`;
        this.pomodoro.message = msg;
        console.log(msg, event)
      }
      // Keep cursol position
      event.target.setSelectionRange(cIndex + 1, cIndex + 1);
    }
  }
  public tabber(event) {
    if (event) {
      event.preventDefault();
      const cIndex = event.target.selectionStart;
      const text = this.pomodoro.message;
      const startText = text.slice(0, cIndex);
      const endText = text.slice(cIndex);
      this.pomodoro.message = `${startText}  ${endText}`;
      // event.target.selectionEnd = event.target.selectionStart + 1;
      // Keep cursol position
      event.target.setSelectionRange(cIndex + 1, cIndex + 1);
    }

  }
  get height() {
    const autosizeHeight = (text, lineHeight) => {
      const nLines = text.match(/\n/g).length;
      return lineHeight * nLines;
    };
    return autosizeHeight(
      this.pomodoro.message,
      this.lineHeight,
    )
  }
  public input(e) {
    if (!e.target.composing) {
      this.pomodoro.message = e.target.value;
    }

    const text = this.pomodoro.message;
  }
  public updated() {
    this.$store.dispatch('pomodoroList/dump');
  }
}
</script>
