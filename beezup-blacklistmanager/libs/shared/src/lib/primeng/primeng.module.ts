import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import {
  ButtonModule, CalendarModule, CheckboxModule, DialogModule,
  DropdownModule,
  FileUploadModule, InputSwitchModule,
  InputTextModule, MenuModule, OverlayPanelModule,
  SelectButtonModule, SliderModule,
  ToastModule, ToggleButtonModule,
  TooltipModule
} from 'primeng';
import { RippleModule } from 'primeng/ripple';
import {TranslateModule} from "@ngx-translate/core";

const PRIMENG_MODULES = [ButtonModule, SelectButtonModule, DropdownModule, ToggleButtonModule, InputSwitchModule, MenuModule, TooltipModule,
  CheckboxModule, OverlayPanelModule, CalendarModule, DialogModule, SliderModule, InputTextModule, DataViewModule, RippleModule, ToastModule,
  FileUploadModule];

@NgModule({
  declarations: [],
  imports: [
    ...PRIMENG_MODULES,
    TranslateModule,
    CommonModule
  ],
  exports: [
    ...PRIMENG_MODULES,
  ]
})
export class PrimengModule { }
