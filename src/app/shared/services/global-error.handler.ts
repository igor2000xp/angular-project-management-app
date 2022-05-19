import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GlobalHandleErrorService implements ErrorHandler {
  handleError(error: any): void {
  }
}
