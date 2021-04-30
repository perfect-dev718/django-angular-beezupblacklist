import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionsService} from "../permissions/permissions.service";
import {ToasterService} from "../toaster/toaster.service";
import {AuthService} from "../auth/auth.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [PermissionsService, ToasterService, AuthService]
})
export class SingletonServicesModule { }
