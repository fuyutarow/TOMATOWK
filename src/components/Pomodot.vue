<template>
  <span :style="style" />
</template>
<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';


const colorMap = (color) => {
  const m = {
    red: '#E53935',
    green: '#32B232',
    yellow: '#ffd500',
  };
  return (color in m) ? m[color] : '##123456';
};


@Component
export default class Pomodoro extends Vue {
  @Prop() public color;
  @Prop() public blank;
  get style() {
    const colorCode = colorMap(this.color);

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
