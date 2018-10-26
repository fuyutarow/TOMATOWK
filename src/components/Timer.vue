<template>
  <div>
    <span :style=style> {{ formatTime }} </span>
  </div>
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';


@Component({
  components: {},
})
export default class Timer extends Vue {
  @Prop() public color;
  @Prop() public progress;

  get timer() {
    return this.$store.state.timer;
  }
  get formatTime() {
    return [
        this.timer.min,
        this.timer.sec,
      ]
      .map((v) => v.toString())
      .map((str) => (str.length < 2) ? '0' + str : str)
      .join(':');
  }
  get takeRest() {
    return this.$store.state.pomodoroSeries.takeRest;
  }
  get style() {
    const colorCode =
      (this.color === 'red') ? '#E53935' : // red darken-1
      (this.color === 'green') ? '#32B232' :
      (this.color === 'yellow') ? '#ffd500' : '#123456';
    return `
      text-align: center;
      font-size: 100px;
      font-weight: lighter;
      font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
      color: ${colorCode}
    `;
  }
}
</script>

<style lang="stylus">
$color-pack=false @import '~vuetify/src/stylus/main'

</style>
