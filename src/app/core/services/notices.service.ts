import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { NoticesModel } from "../models/notices.model";

@Injectable( {
  providedIn: 'root'
} )
export class NoticesService {
  constructor(
    private apiService: ApiService,
  ) {
  }

  get(): Observable<NoticesModel> {
    return this.apiService.get( '/notices' );
  }
}



