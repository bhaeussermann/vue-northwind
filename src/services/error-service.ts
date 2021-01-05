import { Observable, Subject } from "rxjs";

export class ErrorService {
  get showError(): Observable<string> {
    return this._showError;
  }

  private _showError = new Subject<string>();
  
  show(operationDescription: string, error: Error) {
    this._showError.next(`Error ${operationDescription}: ${error.message}`);
  }
}
