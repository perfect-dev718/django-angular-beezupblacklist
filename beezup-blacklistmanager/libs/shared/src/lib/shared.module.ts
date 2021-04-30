import {NgModule} from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {ComponentsModule} from "./components/components.module";
import {DirectivesModule} from "./directives/directives.module";
import {PipesModule} from "./pipes/pipes.module";
import {ServicesModule} from "./services/services.module";
import { PrimengModule } from './primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TranslateModule} from "@ngx-translate/core";
import {ModalDialogModule} from "./modal-dialog/modal-dialog.module";


@NgModule({
  imports: [
    ComponentsModule,
    ModalDialogModule,
    PrimengModule,
    DirectivesModule,
    PipesModule,
    ServicesModule,
    AgGridModule.withComponents([]),
    TranslateModule.forChild({})
  ],
  exports: [
    ComponentsModule,
    ModalDialogModule,
    DirectivesModule,
    PrimengModule,
    PipesModule,
    FontAwesomeModule
  ],
  declarations: [],
  providers: []
})
export class SharedModule {

}
