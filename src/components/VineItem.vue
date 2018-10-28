<template>
  <v-card class="elevation-2" xs7 @click="click($event)">
    <v-card-title>
      <Pomodot :color="pomodoro.color" />
      <span> {{datetime}} </span>
    </v-card-title>
    <v-card-text>
      <v-btn @click='click'>btn</v-btn>
      {{ done}}
      <VueMarkdown :source="pomodoro.message" v-show="done" />
      <Editor v-model:value="pomodoro.message" @done='done=true' v-show="!done" />
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import moment from 'moment';
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import Pomodot from '@/components/Pomodot.vue';
import VueMarkdown from 'vue-markdown';
import Editor from '@/components/Editor/index.vue';

@Component({
  components: {
    Pomodot,
    VueMarkdown,
    Editor,
  },
})
export default class PomodoroList extends Vue {
  @Prop() public pomodoro;
  public onFocus = false;

  get moment() {
    return moment;
  }

  click() {
    this.onFocus = !this.onFocus
    console.log('$$$$$$$$')

  }
}
</script>
