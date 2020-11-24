import { Dependencies } from '@/decorators/dependencies';
import { Employee } from '@/models/employee';
import { EmployeesService } from '@/services/employees-service';
import { ErrorService } from '@/services/error-service';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditEmployee extends Vue {
  private isLoading = false;
  private didLoad = false;
  private didFailLoading = false;
  private isSaving = false;
  
  private isEditing = false;

  private employee: Employee = {
    firstName: '',
    lastName: '',
    title: '',
    birthDate: null
  };

  @Dependencies() errorService!: ErrorService;
  @Dependencies() employeesService!: EmployeesService;

  async mounted() {
    const employeeId: string = this.$route.params.employeeId;
    this.isEditing = !!employeeId;

    if (!this.isEditing) {
      document.title = 'Add Employee';
      this.didLoad = true;
    } else {
      document.title = 'Edit Employee';
      this.isLoading = true;
      try {
        this.employee = await this.employeesService.getEmployee(employeeId);
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

  private async save() {
    try {
      this.adjustBirthDate();
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

    await this.$router.push({ name: 'employees' });
  }

  private cancel() {
    this.$router.back();
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  private adjustBirthDate() {
    // The date given by the date-picker is mid-night in local time, while the time-zone is set to UTC.
    // This will cause the date portion to shift to the previous day if the local time-zone is GMT+xx
    // Account for this by changing the date to mid-night in UTC.
    const birthDate = this.employee.birthDate as Date;
    if (!birthDate) return;
    birthDate.setTime(birthDate.getTime() - birthDate.getTimezoneOffset() * 60 * 1000);
  }
}
