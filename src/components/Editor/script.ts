import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import marked from 'marked';


@Component
export default class Note extends Vue {
  public lineHeight = 20; // px
  // @Prop() text;
  get pomodoro() {
    return this.$store.state.pomodoroList.all
      .filter((a) => a.timestamp === this.$route.params.timestamp)[0];
  }

  get compiledMarkdown() {
    return marked(this.pomodoro.message, {
      sanitize: true,
    });
  }
  get style() {
    return {
      'height': `${this.height + 100}px`,
      'width': `100%`,
      'line-height': `${this.lineHeight}px`,
      'padding': '20px',
    };
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

  public updated() {
    this.$store.dispatch('pomodoroList/dump');
  }

  public input(e) {
    if (!e.target.composing) {
      this.pomodoro.message = e.target.value;
    }
    const text = this.pomodoro.message;
  }

  public enterer(event) {
    if (!event) { return; }

    // press Enter when IME edior
    if (event.keyCode === 229) { return; }

    const text = this.pomodoro.message;
    const cIndex = event.target.selectionStart;
    const startText = text.slice(0, cIndex);
    const endText = text.slice(cIndex);

    // computed completion word and new text
    const nowLine = startText.split('\n').slice(-1)[0];
    const hasLi: any = nowLine.match(/^\t*(-|\*)\s/);
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
    const backText = startText.split('\n').slice(0, -1).join('\n');

    if (!event.shiftKey) {
      /* press Tab to unindent */

      // computed completion word and new text
      const nowLine = startText.split('\n').slice(-1)[0];
      const hasLi: any = nowLine.match(/^\t*(-|\*)\s/);
      let completion;
      if (hasLi) {
        completion = '\n\t';
        this.pomodoro.message = `${backText}${completion}${nowLine}${endText}`;
      } else {
        completion = '\t';
        this.pomodoro.message = `${startText}${completion}${endText}`;
      }

      // Keep cursor position
      event.target.value = this.pomodoro.message;
      const newPosition = cIndex + completion.length - 1;
      event.target.setSelectionRange(newPosition, newPosition);
    } else {
      /* press Shift+Tab to unindent */

      // computed completion word and new text
      const nowLine = startText.split('\n').slice(-1)[0];
      const hasLi: any = nowLine.match(/^\s*(-|\*)\s/);

      if (hasLi) {
        const newLine = nowLine.replace(/\s(-|\*)/, '$1');
        this.pomodoro.message = `${backText}\n${newLine}${endText}`;

        // Keep cursor position
        event.target.value = this.pomodoro.message;
        const newPosition = cIndex - 1;
        event.target.setSelectionRange(newPosition, newPosition);
      }

    }
  }
}
