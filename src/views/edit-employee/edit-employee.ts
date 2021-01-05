import { Dependencies } from '@/decorators/dependencies';
import { Employee } from '@/models/employee';
import { EmployeesService } from '@/services/employees-service';
import { ErrorService } from '@/services/error-service';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class EditEmployee extends Vue {
  @Prop()
  isShown!: boolean;
  @Prop()
  employeeId!: string;

  isLoading = false;
  didLoad = false;
  didFailLoading = false;
  isSaving = false;
  
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
    await this.initialize();
  }

  @Watch('isShown')
  async isShownChanged() {
    if (this.isShown) await this.initialize();
  }

  private async initialize() {
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

    this.$emit('save');
  }

  close() {
    this.$emit('close');
  }
}
