import {NgModule} from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ToasterComponent} from "./toaster/toaster.component";


const COMPONENTS = [
  MenuComponent,
  ToasterComponent
];
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PrimengModule,
    FontAwesomeModule,
  ],
  exports: [...COMPONENTS,
  ],
  declarations: [...COMPONENTS],
  providers: []
})
export class ComponentsModule {

}
