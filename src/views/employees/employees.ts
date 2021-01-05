import { Dependencies } from '@/decorators/dependencies';
import { Employee } from '@/models/employee';
import { EmployeesService } from '@/services/employees-service';
import { ErrorService } from '@/services/error-service';
import { Component, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';

@Component
export default class Employees extends Vue {
  employees: Employee[] = [];
  searchString = '';
  headers: DataTableHeader[];
  isLoading = false;
  didLoad = false;
  isBusy = false;

  displayEditModal = false;
  editedEmployeeId?: string | null = null;
  displayConfirmationModal = false;

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

  addEmployee() {
    this.editedEmployeeId = null;
    this.displayEditModal = true;
  }

  editEmployee(employee: Employee) {
    this.editedEmployeeId = employee.id;
    this.displayEditModal = true;
  }

  modalDidSave() {
    this.loadEmployees();
    this.closeModal();
  }

  closeModal() {
    this.displayEditModal = false;
  }

  async confirmDeleteEmployee(employee: Employee) {
    if (await (this.$refs.dialog as any).open('Delete employee', `Are you sure you want to delete employee <strong>${employee.firstName} ${employee.lastName}</strong>?`)) {
      this.isBusy = true;
      try {
        await this.employeesService.deleteEmployee(employee);
      } catch (error) {
        this.errorService.reportError('deleting employee', error);
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
      this.errorService.reportError('fetching employees', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}
