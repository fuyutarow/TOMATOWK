<template>
  <div style="flex-flow: row wrap;">
    <template v-for="pomodoro in pomodoros">
      <template v-if="pomodoro.color==='white'">
        <br />
      </template>
      <template v-else>
        <v-tooltip top>
          <Pomodot slot="activator" :color="pomodoro.color" :blank="pomodoro.blank" />
          <span>{{ moment(pomodoro.timestamp).format('MM-DD HH:mm')}}</span>
        </v-tooltip>
      </template>
    </template>
  </div>
</template>

<script lang='ts'>
import moment from 'moment';
import Pomodot from '@/components/Pomodot.vue';
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';

@Component({
  components: {
    Pomodot,
  },
})
export default class TablePomodoro extends Vue {
  @Prop()
  public pomodoros;

  public moment = moment;
}
</script>
