import { ToastProgrammatic as Toast } from 'buefy';

export class ErrorService {
  reportError(operationDescription: string, error: Error) {
    Toast.open({
      type: 'is-danger',
      message: `Error ${operationDescription}: ${error.message}`,
      duration: 5000
    });
  }
}
