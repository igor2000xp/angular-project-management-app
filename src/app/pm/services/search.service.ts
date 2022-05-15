import { Injectable } from '@angular/core';
import { ApiService } from '../../auth/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private apiService: ApiService,
  ) { }
}
