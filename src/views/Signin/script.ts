import { Component, Vue } from 'vue-property-decorator';


@Component
export default class App extends Vue {
  get loginUser() {
    return this.$store.state.loginUser;
  }

  public async signin() {
    await this.$store.dispatch('loginUser/signin');
    await this.$router.push({
      name: 'clock',
    });
  }
}
