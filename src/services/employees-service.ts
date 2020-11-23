import { Employee } from '@/models/employee';

export class EmployeesService {
  getEmployees(): Promise<Employee[]> {
    return this.runApiRequest('/employees');
  }

  addEmployee(employee: Employee): Promise<void> {
    return this.runApiRequest('/employees', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(employee)
    });
  }

  private async runApiRequest(requestInfo: RequestInfo, requestInit?: RequestInit): Promise<any> {
    const response = await fetch(requestInfo, requestInit);
    if (response.status !== 200) throw new Error(await response.text());
    return await response.json();
  }
}
