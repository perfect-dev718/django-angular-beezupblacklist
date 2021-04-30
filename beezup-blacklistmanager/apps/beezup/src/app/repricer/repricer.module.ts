import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepricerComponent } from './repricer-container/repricer.component';
import { RepricerRoutingModule } from './repricer-routing.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { SharedModule } from '@beezup/shared';
import {MobxAngularModule} from "mobx-angular";



@NgModule({
  declarations: [RepricerComponent],
  imports: [
    CommonModule,
    RepricerRoutingModule,
    SharedModule,
    AgGridModule.withComponents([]),
    MobxAngularModule
  ],
  exports: [RepricerComponent]
})
export class RepricerModule { }
