import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {LicenseManager} from "@ag-grid-enterprise/core";
import { AppModule } from './app/app.module';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}
LicenseManager.setLicenseKey(`ThetaRay_ThetaRay_Single_Application_1_Devs__16_December_2020_[v2]_MTYwODA3NjgwMDAwMA==45224882623ca4f173aad113c7c25bcf`);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
