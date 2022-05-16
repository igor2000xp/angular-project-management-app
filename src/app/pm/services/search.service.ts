import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor() { }

  searchValue: Subject<string> = new Subject();
}
