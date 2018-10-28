import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import marked from 'marked';


@Component
export default class Editor extends Vue {
  @Prop() public value;
  public text = '';
  public lineHeight = 20; // px

  get style() {
    return {
      'height': `${this.height + 100}px`,
      'width': `100%`,
      'line-height': `${this.lineHeight}px`,
      'padding': '0',
    };
  }
  get height() {
    const autosizeHeight = (text, lineHeight) => {
      const hasLn = text.match(/\n/g);
      return hasLn ? lineHeight * hasLn.length : 0;
    };
    return !this.text ? 0 :
      autosizeHeight(
        this.text,
        this.lineHeight,
      );
  }

  public created( ) {
    this.text = this.value;
  }

  public enterer(event) {
    if (!event) { return; }
    if (event.keyCode === 229) { return; } // press Enter when IME edior
    if (event.ctrlKey || event.metaKey) {
      this.$emit('done', true);
      return;
    }

    const text = this.text;
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
    this.text = `${startText}${completion}${endText}`;


    // Keep cursor position
    event.target.value = this.text;
    const newPosition = cIndex + completion.length;
    event.target.setSelectionRange(newPosition, newPosition);
  }

  public tabber(event) {
    if (!event) { return; }
    if (event.keyCode === 229) { return; } // press Enter when IME edior

    const text = this.text;
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
        this.text = `${backText}${completion}${nowLine}${endText}`;
      } else {
        completion = '\t';
        this.text = `${startText}${completion}${endText}`;
      }

      // Keep cursor position
      event.target.value = this.text;
      const newPosition = cIndex + completion.length - 1;
      event.target.setSelectionRange(newPosition, newPosition);
    } else {
      /* press Shift+Tab to unindent */

      // computed completion word and new text
      const nowLine = startText.split('\n').slice(-1)[0];
      const hasLi: any = nowLine.match(/^\s*(-|\*)\s/);

      if (hasLi) {
        const newLine = nowLine.replace(/\s(-|\*)/, '$1');
        this.text = `${backText}\n${newLine}${endText}`;

        // Keep cursor position
        event.target.value = this.text;
        const newPosition = cIndex - 1;
        event.target.setSelectionRange(newPosition, newPosition);
      }

    }
  }

  private _input(e) {
    if (!e.target.composing) {
      this.text = e.target.value;
    }
    this.$emit('input', this.text);
  }
}
