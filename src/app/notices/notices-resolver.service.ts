import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { NoticesService } from "../core/services/notices.service";
import { NoticesModel } from "../core/models/notices.model";

@Injectable( {
  providedIn: 'root'
} )
export class NoticesResolver implements Resolve<NoticesModel> {
  constructor(
    private noticesService: NoticesService,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    return this.noticesService.get();
  }
}
