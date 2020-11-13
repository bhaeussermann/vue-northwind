import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Employees extends Vue {
  private employees = [];
  
  async mounted() {
    const response = await fetch('/employees');
    this.employees = await response.json();
  }
}
