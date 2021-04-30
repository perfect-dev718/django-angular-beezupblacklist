import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ServerApiService} from "./server-api/server-api.service";
import {WebSocketService} from "./web-socket/web-socket.service";
import {LocalStorageService} from "./local-storage/local-storage.service";
import { AgGridOptionsUtils } from './ag-grid-options/ag-grid-options.service';
import {LoginModel} from "../../../../../apps/beezup/src/app/login/services/login.service";
import {TokenInterceptor} from "./interceptors/token-interceptor/token-interceptor.interceptor";
import {PermissionsGuardService} from "./permissions-guard.service";
import {MessageService} from "primeng";


const SERVICES = [
  ServerApiService,WebSocketService,LocalStorageService, AgGridOptionsUtils, LoginModel,
  TokenInterceptor, WebSocketService, PermissionsGuardService,MessageService
];
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [],
  providers: [...SERVICES]
})
export class ServicesModule {

}
