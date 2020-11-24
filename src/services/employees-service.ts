import { Employee } from '@/models/employee';

export class EmployeesService {
  getEmployees(): Promise<Employee[]> {
    return this.runApiRequestGetResponse<Employee[]>('/employees');
  }

  async getEmployee(employeeId: string): Promise<Employee> {
    const employee = await this.runApiRequestGetResponse<Employee>('/employees/' + employeeId);
    if (employee.birthDate) {
      employee.birthDate = new Date(Date.parse(employee.birthDate.toString()));
    }
    return employee;
  }

  async addEmployee(employee: Employee): Promise<void> {
    await this.runApiRequest('/employees', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(employee)
    });
  }

  async updateEmployee(employee: Employee): Promise<void> {
    await this.runApiRequest('/employees/' + employee.id, {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(employee)
    });
  }

  private async runApiRequestGetResponse<T>(requestInfo: RequestInfo, requestInit?: RequestInit): Promise<T> {
    const response = await this.runApiRequest(requestInfo, requestInit);
    return await response.json() as T;
  }

  private async runApiRequest(requestInfo: RequestInfo, requestInit?: RequestInit): Promise<Response> {
    const response = await fetch(requestInfo, requestInit);
    if (response.status !== 200) throw new Error(await response.text());
    return response;
  }
}
