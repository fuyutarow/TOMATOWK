<template>
  <span :style="style" />
</template>
<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
@Component({
})
export default class Pomodoro extends Vue {
  @Prop() public color: string = '';
  get style() {
    const colorCode =
      (this.color === 'red') ? '#ff2b00' :
      (this.color === 'green') ? '#32B232' : '#123456';

    return `
      height: 10px;
      width: 10px;
      background-color: ${colorCode};
      border-radius: 50%;
      margin:2px;
      display: inline-block;`;
  }
}
</script>
