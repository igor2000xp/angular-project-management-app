import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchValue: Subject<string> = new Subject();

  searchMode: Subject<any> = new Subject();
}
