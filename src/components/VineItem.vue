<template>
  <v-timeline-item color="red darken-1" fill-dot left small>
    <v-layout justify-space-between>
      <v-flex>
        <v-card class="elevation-2" xs7 @click.native:"click($event)">
          <v-card-text>
            <v-btn @click='click'>btn</v-btn>
            <VueMarkdown :source="pomodoro.message" v-show="!onFocus" />
            <Editor :value="pomodoro.message" v-show="onFocus" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs5 text-xs-right>{{moment(pomodoro.timestamp).fromNow()}}</v-flex>
    </v-layout>
  </v-timeline-item>

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
