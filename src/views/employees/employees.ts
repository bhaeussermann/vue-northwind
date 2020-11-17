import { Employee } from '@/models/employee';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Employees extends Vue {
  private employees: Employee[] = [];
  private filteredEmployees: Employee[] = [];
  private isLoading = false;
  private didLoad = false;

  private get searchString(): string {
    return this._searchString;
  }
  private set searchString(newValue: string) {
    this._searchString = newValue;
    this.refreshFilteredEmployees();
  }
  private _searchString = '';

  async mounted() {
    this.isLoading = true;
    try {
      this.employees = await this.runApiRequest('/employees');
      this.refreshFilteredEmployees();
      this.didLoad = true;
    } catch (error) {
      this.$buefy.toast.open({
        type: 'is-danger',
        message: 'Error fetching employees: ' + error.message,
        duration: 5000
      })
    } finally {
      this.isLoading = false;
    }
  }

  private refreshFilteredEmployees() {
    this.filteredEmployees = this.employees.filter(e => {
      if (!this._searchString) return true;
      return (
        e.firstName.toLowerCase().includes(this._searchString.toLowerCase()) ||
        e.lastName.toLowerCase().includes(this._searchString.toLowerCase()) ||
        e.title.toLowerCase().includes(this._searchString.toLowerCase())
      );
    });
  }

  private async runApiRequest(requestInfo: RequestInfo) {
    const response = await fetch(requestInfo);
    if (response.status !== 200) throw new Error(await response.text());
    return await response.json();
  }
}
