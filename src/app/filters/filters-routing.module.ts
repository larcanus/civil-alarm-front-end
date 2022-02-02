import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { FiltersComponent } from './filters.component';
import { FiltersResolver } from "./filter-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: FiltersComponent,
    canActivate: [AuthGuard],
    resolve: {
      filters: FiltersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltersRoutingModule {}
