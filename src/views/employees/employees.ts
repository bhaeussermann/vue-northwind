import { Dependencies } from '@/decorators/dependencies';
import { Employee } from '@/models/employee';
import { EmployeesService } from '@/services/employees-service';
import { ErrorService } from '@/services/error-service';
import { Component, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import EditEmployee from "../edit-employee/edit-employee";

@Component
export default class Employees extends Vue {
  employees: Employee[] = [];
  searchString = '';
  headers: DataTableHeader[];
  isLoading = false;
  didLoad = false;
  isBusy = false;

  @Dependencies() errorService!: ErrorService;
  @Dependencies() employeesService!: EmployeesService;

  constructor() {
    super();
    this.headers = [
      { text: 'Last name', value: 'lastName' },
      { text: 'First name', value: 'firstName' },
      { text: 'Title', value: 'title' },
      { text: '', value: 'edit-button', sortable: false },
      { text: '', value: 'delete-button', sortable: false }
    ];
  }

  async mounted() {
    document.title = 'Employees';
    await this.loadEmployees();
  }

  async addEmployee() {
    if (await (this.$refs.editEmployeeDialog as EditEmployee).open()) {
      this.loadEmployees();
    }
  }

  async editEmployee(employee: Employee) {
    if (await (this.$refs.editEmployeeDialog as EditEmployee).open(employee.id)) {
      this.loadEmployees();
    }
  }

  async confirmDeleteEmployee(employee: Employee) {
    if (await (this.$refs.dialog as any).open('Delete employee', `Are you sure you want to delete employee <strong>${employee.firstName} ${employee.lastName}</strong>?`)) {
      this.isBusy = true;
      try {
        await this.employeesService.deleteEmployee(employee);
      } catch (error) {
        this.errorService.show('deleting employee', error);
        throw error;
      } finally {
        this.isBusy = false;
      }
  
      this.loadEmployees();
    }
  }

  private async loadEmployees() {
    this.didLoad = false;
    this.isLoading = true;
    try {
      this.employees = await this.employeesService.getEmployees();
      this.didLoad = true;
    } catch (error) {
      this.errorService.show('fetching employees', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}
