<template>
  <v-container>
    <v-layout>
      <v-flex>
        <p>{{ datetime }}</p>
        <!--
          <v-textarea solo name="input-7-4" label="commit message" v-model:value="pomodoro.message"></v-textarea>
        <textarea v-model:value="pomodoro.message" :style="style" @input='input'></textarea>
        -->
        <textarea :value="pomodoro.message" :style="style" @input='input' @keydown.tab.prevent="tabber($event)" @keydown.enter.prevent="enterer"></textarea>
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


@Component
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
    if (!event) {
      return;
    }
    const text = this.pomodoro.message;
    const cIndex = event.target.selectionStart;
    const startText = text.slice(0, cIndex);
    const endText = text.slice(cIndex);

    // computed completion word and new text
    const nowLine = startText.split('\n').slice(-1)[0];
    const hasLi: any = nowLine.match(/^\s*(-|\*)\s/);
    let completion = '\n';
    if (hasLi) {
      const li = hasLi.input.split(/(-|\*)\s/).slice(0, 2).join('');
      completion = `\n${li} `;
    }
    this.pomodoro.message = `${startText}${completion}${endText}`;

    // Keep cursor position
    event.target.value = this.pomodoro.message;
    const newPosition = cIndex + completion.length;
    event.target.setSelectionRange(newPosition, newPosition);
  }

  public tabber(event) {
    if (!event) {
      return;
    }
    const text = this.pomodoro.message;
    const cIndex = event.target.selectionStart;
    const startText = text.slice(0, cIndex);
    const endText = text.slice(cIndex);

    // computed completion word and new text
    const nowLine = startText.split('\n').slice(-1)[0];
    const hasLi: any = nowLine.match(/^\s*(-|\*)\s/);
    let completion;
    if (hasLi) {
      completion = '\n ';
      const backText = startText.split('\n').slice(0, -1).join('\n');
      this.pomodoro.message = `${backText}${completion}${nowLine}${endText}`;
    } else {
      completion = ' ';
      this.pomodoro.message = `${startText}${completion}${endText}`;
    }

    // Keep cursor position
    event.target.value = this.pomodoro.message;
    const newPosition = cIndex + completion.length - 1;
    event.target.setSelectionRange(newPosition, newPosition);
  }
  get height() {
    const autosizeHeight = (text, lineHeight) => {
      const nLines = text.match(/\n/g).length;
      return lineHeight * nLines;
    };
    return autosizeHeight(
      this.pomodoro.message,
      this.lineHeight,
    );
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
