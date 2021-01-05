export class ErrorService {
  reportError(operationDescription: string, error: Error) {
    // TODO: Implement a snackbar component to show the error.
    console.error(`Error ${operationDescription}: ${error.message}`);
  }
}
