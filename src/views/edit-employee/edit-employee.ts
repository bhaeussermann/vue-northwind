import { Dependencies } from '@/decorators/dependencies';
import { Employee } from '@/models/employee';
import { EmployeesService } from '@/services/employees-service';
import { ErrorService } from '@/services/error-service';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditEmployee extends Vue {
  show = false;
  resolve!: Function;

  isEditing = false;
  isLoading = false;
  didLoad = false;
  didFailLoading = false;
  isSaving = false;
  
  private employee: Employee = {
    firstName: '',
    lastName: '',
    title: '',
    birthDate: null
  };

  @Dependencies() private errorService!: ErrorService;
  @Dependencies() private employeesService!: EmployeesService;

  async open(employeeId: string | null = null): Promise<boolean> {
    const promise = new Promise<boolean>(r => this.resolve = r);
    return this.initialize(employeeId)
      .then(_ => promise, _ => promise);
  }

  async save() {
    try {
      this.isSaving = true;
      if (this.isEditing) {
        await this.employeesService.updateEmployee(this.employee);
      } else {
        await this.employeesService.addEmployee(this.employee);
      }
    } catch (error) {
      this.errorService.reportError('saving employee', error);
      throw error;
    } finally {
      this.isSaving = false;
    }

    this.show = false;
    this.resolve(true);
  }

  close() {
    this.show = false;
    this.resolve(false);
  }

  private async initialize(employeeId: string | null) {
    this.isEditing = !!employeeId;
    this.show = true;
    this.didLoad = false;
    
    if (!this.isEditing) {
      this.employee = {
        firstName: '',
        lastName: '',
        title: '',
        birthDate: null
      };
      setTimeout(() => this.didLoad = true);
    } else {
      this.isLoading = true;
      try {
        this.employee = await this.employeesService.getEmployee(employeeId as string);
        this.didLoad = true;
      } catch (error) {
        this.didFailLoading = true;
        this.errorService.reportError('loading employee', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
