<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <Header />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang='ts'>
import firebase from 'firebase';
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import {
  Header,
} from '@/views';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {}
</script>
