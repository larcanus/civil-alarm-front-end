import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { NoticesComponent } from "./notices.component";
import { NoticesResolver } from "./notices-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: NoticesComponent,
    canActivate: [AuthGuard],
    resolve: {
      notices: NoticesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticesRoutingModule {}
