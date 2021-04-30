import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutobuyRoutingModule } from './autobuy-routing.module';
import { AutobuyContainerComponent } from './autobuy-container/autobuy-container.component';
import {SharedModule} from "@beezup/shared";
import {AgGridModule} from "@ag-grid-community/angular";
import {MobxAngularModule} from "mobx-angular";
import {AgCellActionsComponent} from "./ag-cells/ag-cell-actions/ag-cell-actions.component";
import {AgCellLinkComponent} from "./ag-cells/ag-cell-link/ag-cell-link.component";
import {AgCellProductInfoComponent} from "./ag-cells/ag-cell-productInfo/ag-cell-productInfo.component";
import { OrderInfoComponent } from './components/order-info/order-info.component';
import {AutobuyComponent} from "./components/autobuy-table/autobuy.component";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [AutobuyContainerComponent, AgCellLinkComponent, AgCellActionsComponent, AgCellProductInfoComponent, OrderInfoComponent, AutobuyComponent],
  imports: [
    CommonModule,
    AutobuyRoutingModule,
    TranslateModule,
    SharedModule,
    AgGridModule.withComponents([]),
    MobxAngularModule
  ],
  exports: [AutobuyContainerComponent, AgCellLinkComponent, AgCellActionsComponent, AgCellProductInfoComponent, AutobuyComponent]
})
export class AutobuyModule { }
