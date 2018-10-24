<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <h1 style="font-size:100px">
          {{ formatTime }}
        </h1>
      </v-flex>
      {{ timer }}
      <v-flex mb-4>
        <template v-if="timer.inPause">
          <v-btn @click="play" fab dark>
            <i class="material-icons">play_arrow</i>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="pause" fab dark>
            <i class="material-icons">pause</i>
          </v-btn>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import {
  Component,
  Vue,
} from 'vue-property-decorator';


@Component({
  components: {},
})
export default class Timer extends Vue {
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
  public play() {
    this.$store.dispatch('timer/play');
  }
  public pause() {
    this.$store.dispatch('timer/pause');
  }
}
</script>

<style>

</style>
