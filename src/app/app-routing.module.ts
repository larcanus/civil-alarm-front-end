import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule )
  },
  {
    path: 'filters',
    loadChildren: () => import('./filters/filters.module').then( m => m.FiltersModule )
  },
  {
    path: 'notices',
    loadChildren: () => import('./notices/notices.module').then( m => m.NoticesModule )
  }
];

@NgModule( {
  imports: [
    QuicklinkModule,
    RouterModule.forRoot( routes, {
      preloadingStrategy: QuicklinkStrategy,
      relativeLinkResolution: 'legacy',
      useHash: true
    } ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
