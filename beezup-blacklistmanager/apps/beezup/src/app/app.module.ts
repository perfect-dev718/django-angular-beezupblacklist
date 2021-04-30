import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BlackListModule} from "./black-list/black-list.module";
import {AppRoutingModule} from "./app-routing.module";
import { SharedModule } from '@beezup/shared';
import { SingletonServicesModule } from '../../../../libs/shared/src/lib/services/singleton-services/singleton-services.module';
import { RepricerModule } from './repricer/repricer.module';
import {MobxAngularModule} from "mobx-angular";
import {ToasterInterceptor} from "../../../../libs/shared/src/lib/services/interceptors/toaster-interceptor/toaster-interceptor.interceptor";
import {TokenInterceptor} from "../../../../libs/shared/src/lib/services/interceptors/token-interceptor/token-interceptor.interceptor";
import {AgGridModule} from "ag-grid-angular";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

export const TranslationModule = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    BlackListModule,
    RepricerModule,
    SharedModule,
    SingletonServicesModule,
    MobxAngularModule,
    TranslationModule],
  exports: [AgGridModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }, {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ToasterInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
