import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { NoticesComponent } from "./notices.component";
import { NoticesRoutingModule } from "./notices-routing.module";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  imports: [
    SharedModule,
    NoticesRoutingModule,
    MatTableModule
  ],
  declarations: [
    NoticesComponent
  ],
  providers: [
  ]
})
export class NoticesModule {}
