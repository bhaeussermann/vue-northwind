import { Employee } from '@/models/employee';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditEmployee extends Vue {
  private isSaving = false;
  private employee: Employee = {
    firstName: '',
    lastName: '',
    title: '',
    birthDate: null
  };

  mounted() {
    document.title = 'Add Employee';
  }

  private async save() {
    try {
      this.adjustBirthDate();
      this.isSaving = true;
      await this.runApiRequest('/employees', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(this.employee)
      });
    } catch (error) {
      this.$buefy.toast.open({
        type: 'is-danger',
        message: 'Error saving employee: ' + error.message,
        duration: 5000
      });
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

  private async runApiRequest(requestInfo: RequestInfo, requestInit?: RequestInit) {
    const response = await fetch(requestInfo, requestInit);
    if (response.status !== 200) throw new Error(await response.text());
    return await response.json();
  }
}
