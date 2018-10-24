<template>
  <Timer />
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import Timer from '@/components/Timer.vue';

@Component({
  components: {
    Timer,
  },
})
export default class Home extends Vue {}
</script>
