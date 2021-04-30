import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountabilityRoutingModule } from './accountability-routing.module';
import { AccountabilityComponent } from './accountability-container/accountability.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@beezup/shared";
import {AgGridModule} from "@ag-grid-community/angular";
import {MobxAngularModule} from "mobx-angular";



@NgModule({
  declarations: [AccountabilityComponent],
  imports: [
    CommonModule,
    AccountabilityRoutingModule,
    TranslateModule,
    SharedModule,
    AgGridModule.withComponents([]),
    MobxAngularModule
  ],
  exports: [AccountabilityComponent]
})
export class AccountabilityModule { }
