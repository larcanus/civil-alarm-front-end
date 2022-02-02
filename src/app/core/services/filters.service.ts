import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { FiltersModel } from '../models/filters.model';
import { UserService } from "./user.service";

@Injectable( {
  providedIn: 'root'
} )
export class FiltersService {
  constructor(
    private userService: UserService,
    private apiService: ApiService,
  ) {
  }

  getCurrent(): FiltersModel {
    return this.userService.getCurrentUser().filters;
  }

  update( filtersBody: Object ): Observable<any> {
    return this.apiService.put( '/filters', { filters: filtersBody } );
  }
}
