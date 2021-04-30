import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlackListComponent} from "./black-list-container/black-list.component";
import {SharedModule} from "@beezup/shared";
import { FormsModule } from '@angular/forms';
import { BlackListRoutingModule } from './black-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BlackListRoutingModule
  ],
  exports: [SharedModule, BlackListComponent],
  declarations: [ BlackListComponent],
  providers: []
})
export class BlackListModule {
}
