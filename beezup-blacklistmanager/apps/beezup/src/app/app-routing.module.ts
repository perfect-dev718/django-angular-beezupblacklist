import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {PermissionsGuardService} from "../../../../libs/shared/src/lib/services/permissions-guard.service";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'blacklist'
      },
      {
        path: 'blacklist',
        // canActivate: [PermissionsGuardService],
        loadChildren: () => import('./black-list/black-list.module').then(m => m.BlackListModule)
      },
      {
        path: 'repricer',
        loadChildren: () => import('./repricer/repricer.module').then(m => m.RepricerModule)
      },
      {
        path: 'comptabilite',
        loadChildren: () => import('./accountability/accountability.module').then(m => m.AccountabilityModule)
      },
      {
        path: 'achat-automatique',
        loadChildren: () => import('./autobuy/autobuy.module').then(m => m.AutobuyModule)
      },
      {
        path: 'control-center',
        loadChildren: () => import('./control-center/control-center.module').then(m => m.ControlCenterModule)
      },
      {
        path: 'gestion-de-suivis',
        loadChildren: () => import('./orders-management/orders-management.module').then(m => m.OrdersManagementModule)
      },
      {
        path: 'catalog-marketplaces',
        loadChildren: () => import('./catalog-marketplaces/catalog-marketplaces.module').then(m => m.CatalogMarketplacesModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {


}
