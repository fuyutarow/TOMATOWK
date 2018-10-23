<template>
  <div style="padding:50px;flex-flow: row wrap;">
    <template v-for="pomodoro in pomodoros">
      <Pomodot :color="pomodoro.color" />
    </template>
  </div>
</template>

<script lang='ts'>
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
  @Prop() public pomodoros;
}
</script>
