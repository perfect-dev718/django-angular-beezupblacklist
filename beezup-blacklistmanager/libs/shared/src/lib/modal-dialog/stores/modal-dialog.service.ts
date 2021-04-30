import {Injectable} from '@angular/core';
import {action, observable} from 'mobx-angular';

export interface ModalButtonsText {
  apply: string;
  decline: string;
}

@Injectable()
export class ModalDialogStore {

  @observable displayModal = false;
  @observable currentDialog: any;
  public currentData: any;
  public modalButtonsText: ModalButtonsText;
  public modalTitle: string;
  public callback: any;
  public cancelCallback: any;

  constructor() {
  }

  @action
  open(currentDialog, currentData?, callback?, cancelCallback?, modalButtonsText?: ModalButtonsText, modalTitle?: string) {
    this.close();
    setTimeout(() => {
      this.displayModal = true;
      this.currentDialog = currentDialog;
      this.callback = callback;
      this.currentData = currentData;
      this.modalButtonsText = modalButtonsText;
      this.modalTitle = modalTitle;
      this.cancelCallback = cancelCallback;
    })
  }

  @action
  close() {
    this.currentDialog = null;
    this.displayModal = false;
    this.currentData = null;
    this.callback = null;
    this.cancelCallback = null;
  }

}
