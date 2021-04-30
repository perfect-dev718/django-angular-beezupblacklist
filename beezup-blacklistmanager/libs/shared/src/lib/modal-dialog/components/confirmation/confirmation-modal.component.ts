import {Component, ContentChild, OnInit, TemplateRef} from '@angular/core';
import {ModalButtonsText, ModalDialogStore} from '../../stores/modal-dialog.service';

@Component({
  selector: 'tr-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @ContentChild('confModalContent', {static: true}) confModalContent;

  public modalData: any;
  public callback: any;
  public cancelCallback: any;
  public buttonsText: ModalButtonsText;

  constructor(private modalDialogStore: ModalDialogStore) {
  }

  ngOnInit() {
    this.modalData = this.modalDialogStore.currentData;
    this.callback = this.modalDialogStore.callback;
    this.cancelCallback = this.modalDialogStore.cancelCallback;
    this.buttonsText = this.modalDialogStore.modalButtonsText;
  }

  public closeModal() {
    if (this.cancelCallback) {
      this.cancelCallback();
    }
    this.modalDialogStore.close();
  }

  public execCallback() {
    this.callback();
    this.modalDialogStore.close();
  }
}
