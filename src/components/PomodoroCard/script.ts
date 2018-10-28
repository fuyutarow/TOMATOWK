import moment from 'moment';
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
import Pomodot from '@/components/Pomodot.vue';
import VueMarkdown from 'vue-markdown';
import Editor from '@/components/Editor/index.vue';


const colorMap = (color) => {
  const m = {
    red: '#E53935',
    green: '#32B232',
    yellow: '#ffd500',
  };
  return (color in m) ? m[color] : '##123456';
};


@Component({
  components: {
    Pomodot,
    VueMarkdown,
    Editor,
  },
})
export default class PomodoroList extends Vue {
  @Prop()
  public pomodoro;

  @Prop({default: true})
  public setDone;

  public done = true;

  public mounted() {
    this.done = this.setDone;
  }

  get datetime() {
    return moment(this.pomodoro.timestamp).fromNow();
  }

  get cardStyle() {
    return {
      border: `solid thin ${colorMap(this.pomodoro.color)}`,
    };
  }

  @Watch('pomodoro.message')
  public save() {
    this.$store.dispatch('pomodoroList/dump');

  }
}
