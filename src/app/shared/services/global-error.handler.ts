import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GlobalHandleErrorService implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    console.error(error);
  }
}
