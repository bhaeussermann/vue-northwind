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
      body: JSON.stringify(employee)
    });
  }

  async updateEmployee(employee: Employee): Promise<void> {
    await this.runApiRequest('/employees/' + employee.id, {
      method: 'put',
      body: JSON.stringify(employee)
    });
  }

  async deleteEmployee(employee: Employee): Promise<void> {
    await this.runApiRequest('/employees/' + employee.id, { method: 'delete' });
  }

  private async runApiRequestGetResponse<T>(path: string, requestInit?: RequestInit): Promise<T> {
    const response = await this.runApiRequest(path, requestInit);
    return await response.json() as T;
  }

  private async runApiRequest(path: string, requestInit: RequestInit = {}): Promise<Response> {
    const headers = new Headers(requestInit.headers);
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
    if (!headers.has('accept')) headers.set('accept', 'application/json');
    requestInit.headers = headers;

    const response = await fetch('/api' + path, requestInit);
    if (response.status !== 200) throw new Error(await response.text());
    return response;
  }
}
