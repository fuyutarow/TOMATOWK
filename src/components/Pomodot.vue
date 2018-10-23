<template>
  <span :style="style" />
</template>
<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
@Component({})
export default class Pomodoro extends Vue {
  @Prop() public color;
  @Prop() public blank;
  get style() {
    const colorCode =
      (this.color === 'red') ? '#ff2b00' :
      (this.color === 'green') ? '#32B232' :
      (this.color === 'yellow') ? '#ffd500' : '#123456';

    const blank = (this.blank) ? this.blank : false;
    return (blank) ? `
      height: 10px;
      width: 10px;
      border-radius: 50%;
      opacity: 1;
      border: thin solid ${colorCode};
      margin:2px;
      display: inline-block;
    ` : `
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: ${colorCode};
      margin:2px;
      display: inline-block;
    `;
  }
}
</script>
