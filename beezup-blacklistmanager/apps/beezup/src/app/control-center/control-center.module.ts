import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCenterRoutingModule } from './control-center-routing.module';
import { ControlCenterComponent } from './control-center-container/control-center.component';



@NgModule({
  declarations: [ControlCenterComponent],
  imports: [
    CommonModule,
    ControlCenterRoutingModule
  ],
  exports: [ControlCenterComponent]
})
export class ControlCenterModule { }
