<template>
  <v-card class="elevation-2" :style="cardStyle">
    <v-card-title style="padding-bottom:0">
      <Pomodot :color="pomodoro.color" />
      <span> {{datetime}} </span>
    </v-card-title>
    <template v-if='done'>
      <v-card-text>
        <span @click='done=false'><VueMarkdown :source="pomodoro.message" v-show="done" /></span>
      </v-card-text>
    </template>
    <template v-else>
      <v-card-text>
        <Editor v-model:value="pomodoro.message" @done='done=true' v-show="!done" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn slot="activator" color="orange" small flat dark>
            show
          </v-btn>
          <span>ctrl+Enter</span>
        </v-tooltip>

      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang='ts'>
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
  @Prop() public pomodoro;
  public done = true;

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
</script>
