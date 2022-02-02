import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FiltersModel } from '../core/models/filters.model';
import { FiltersService } from "../core/services/filters.service";

@Injectable( {
  providedIn: 'root'
} )
export class FiltersResolver implements Resolve<FiltersModel> {
  constructor(
    private filterService: FiltersService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    return this.filterService.getCurrent();
  }
}
