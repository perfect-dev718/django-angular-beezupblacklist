import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainModalDialogComponent} from './main-modal-dialog/main-modal-dialog.component';
import {
  AutoCompleteModule,
  ButtonModule,
  CheckboxModule,
  DialogModule,
  DropdownModule,
  RadioButtonModule
} from 'primeng';
import {ModalDialogStore} from './stores/modal-dialog.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ComponentsModule} from '../components/components.module';
import {WarningComponent} from './components/warning/warning.component';
import {WarningWithIconComponent} from './components/warning-with-icon/warning-with-icon.component';
import {ConfirmationModalComponent} from './components/confirmation/confirmation-modal.component';
import {BasicModalComponent} from './components/header-modal/basic-modal.component';
import {TranslateModule} from "@ngx-translate/core";

const PRIME_MODULES = [ButtonModule, DialogModule, AutoCompleteModule, DropdownModule, CheckboxModule, RadioButtonModule];
const MODAL_COMPONENTS = [MainModalDialogComponent, WarningComponent, WarningWithIconComponent, ConfirmationModalComponent, BasicModalComponent];

@NgModule({
  imports: [
    CommonModule,
    ...PRIME_MODULES,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [...MODAL_COMPONENTS],
  exports: [...PRIME_MODULES, ...MODAL_COMPONENTS],
  providers: [ModalDialogStore]
})
export class ModalDialogModule {
}
