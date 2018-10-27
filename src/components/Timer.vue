<template>
  <div :style=style>{{ formatTime }}</div>
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
			text-align:center;
			font-feature-settings: "smcp", "zero";
			font-size: 80px;
			padding: 0;
			margin: 0;
			font-weight: 1;
  //    font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
			font-family: 'Roboto', sans-serif;
      color: ${colorCode}
    `;
  }
}
</script>

<style lang="stylus">
$color-pack=false @import '~vuetify/src/stylus/main'
@import url('https://fonts.googleapis.com/css?family=Roboto');

</style>
