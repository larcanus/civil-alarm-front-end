import { NgModule } from '@angular/core';

import { FiltersComponent } from './filters.component';
import { SharedModule } from '../shared';
import { FiltersRoutingModule } from "./filters-routing.module";

@NgModule({
  imports: [
    SharedModule,
    FiltersRoutingModule
  ],
  declarations: [
    FiltersComponent
  ],
  providers: [
  ]
})
export class FiltersModule {}
