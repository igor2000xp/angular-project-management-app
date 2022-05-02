import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class ErrorService {
  errorMessage$ = new BehaviorSubject<string>('');

  takeErrorMessage(error:string){
    this.errorMessage$.next(error);
  }
}
