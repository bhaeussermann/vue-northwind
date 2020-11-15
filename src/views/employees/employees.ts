import { Employee } from '@/models/employee';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Employees extends Vue {
  private employees: Employee[] = [];
  private filteredEmployees: Employee[] = [];

  private get searchString(): string {
    return this._searchString;
  }
  private set searchString(newValue: string) {
    this._searchString = newValue;
    this.refreshFilteredEmployees();
  }
  private _searchString = '';

  async mounted() {
    const response = await fetch('/employees');
    this.employees = await response.json();
    this.refreshFilteredEmployees();
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
}
