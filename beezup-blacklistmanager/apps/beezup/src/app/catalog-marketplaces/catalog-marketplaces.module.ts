import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogMarketplacesRoutingModule } from './catalog-marketplaces-routing.module';
import { CatalogMarketplacesComponent } from './catalog-marketplaces-container/catalog-marketplaces.component';



@NgModule({
  declarations: [CatalogMarketplacesComponent],
  imports: [
    CommonModule,
    CatalogMarketplacesRoutingModule
  ],
  exports: [CatalogMarketplacesComponent]
})
export class CatalogMarketplacesModule { }
