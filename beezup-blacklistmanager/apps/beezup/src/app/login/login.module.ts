import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {LoginStoreService} from './stores/login-store.service';
import { TranslateModule} from '@ngx-translate/core';
import {LoginModel} from "./services/login.service";
import {SharedModule} from "@beezup/shared";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    FormsModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent
  ],
  exports: [SharedModule],
  providers: [
    LoginModel,
    LoginStoreService
  ]

})
export class LoginModule {
}
