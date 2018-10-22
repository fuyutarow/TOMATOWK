<template>
  <Timer />
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Timer from '@/components/Timer.vue'; // @ is an alias to /src

@Component({
  components: {
    Timer,
  },
})
export default class Home extends Vue {}
</script>
