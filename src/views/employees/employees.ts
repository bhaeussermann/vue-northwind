import { Dependencies } from '@/decorators/dependencies';
import { Employee } from '@/models/employee';
import { EmployeesService } from '@/services/employees-service';
import { MyService } from '@/services/my-service';
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

  @Dependencies() employeesService!: EmployeesService;

  async mounted() {
    document.title = 'Employees';
    this.isLoading = true;
    try {
      this.employees = await this.employeesService.getEmployees();
      this.refreshFilteredEmployees();
      this.didLoad = true;
    } catch (error) {
      this.$buefy.toast.open({
        type: 'is-danger',
        message: 'Error fetching employees: ' + error.message,
        duration: 5000
      });
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  addEmployee() {
    this.$router.push({ name: 'add-employee' });
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
