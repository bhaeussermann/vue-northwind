import { Dependencies } from '@/decorators/dependencies';
import { Employee } from '@/models/employee';
import { EmployeesService } from '@/services/employees-service';
import { ErrorService } from '@/services/error-service';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditEmployee extends Vue {
  @Prop()
  employeeId!: string;

  private isLoading = false;
  private didLoad = false;
  private didFailLoading = false;
  private isSaving = false;
  
  private get isEditing() {
    return !!this.employeeId;
  }

  private employee: Employee = {
    firstName: '',
    lastName: '',
    title: '',
    birthDate: null
  };

  @Dependencies() private errorService!: ErrorService;
  @Dependencies() private employeesService!: EmployeesService;

  async mounted() {
    if (!this.isEditing) {
      this.didLoad = true;
    } else {
      this.isLoading = true;
      try {
        this.employee = await this.employeesService.getEmployee(this.employeeId);
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

  async save() {
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

    this.close();
    this.$emit('save');
  }

  close() {
    (this.$parent as any).close();
  }

  formatDate(date: Date): string {
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
