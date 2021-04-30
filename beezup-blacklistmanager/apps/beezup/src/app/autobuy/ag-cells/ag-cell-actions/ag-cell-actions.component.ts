import { Component, OnInit } from '@angular/core';
import { startCase } from 'lodash';
import {ModalDialogStore} from "../../../../../../../libs/shared/src/lib/modal-dialog/stores/modal-dialog.service";
import {MODAL_DIALOG_NAMES} from "../../../../../../../libs/shared/src/lib/modal-dialog/constants/modal-dialog-names.enum";

export enum Actions {
  REVIEWED= "REVIEWED",
  REFUSED = "REFUSED",
  CONFIRMED = "CONFIRMED"
}

@Component({
  selector: 'tr-ag-cell-actions',
  templateUrl: './ag-cell-actions.component.html',
  styleUrls: ['./ag-cell-actions.component.scss']
})
export class AgCellActionsComponent implements OnInit {
  public value: any;
  private params: any;
  public actions = Actions;

  constructor(private modalStore: ModalDialogStore) { }

  agInit(params) {
    this.params = params;
    this.value = params.value;
  }

  ngOnInit() {
  }

  public openModal(action: string): void {

    const callback = () => {
      console.log(action);
      //todo call rest to perform action
    };

    this.modalStore.open(MODAL_DIALOG_NAMES.CONFIRM_MODAL, null, callback.bind(this), null,{
      apply: startCase(action),
      decline: 'actions.cancel'
    })
  }

}
