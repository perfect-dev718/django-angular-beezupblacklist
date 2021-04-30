import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CatalogMarketplacesComponent } from './catalog-marketplaces-container/catalog-marketplaces.component';

export const routes: Routes = [
  {
    path: '',
    component: CatalogMarketplacesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogMarketplacesRoutingModule {
}
