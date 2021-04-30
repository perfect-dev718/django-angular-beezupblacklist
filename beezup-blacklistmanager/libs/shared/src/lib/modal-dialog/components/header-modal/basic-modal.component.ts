import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {ModalButtonsText, ModalDialogStore} from '../../stores/modal-dialog.service';

@Component({
  selector: 'tr-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss']
})
export class BasicModalComponent implements OnInit {
  @ContentChild('headerModalContent', {static: true}) headerModalContent;
  @Input() disabledApplyBtn = false;

  constructor(public modalDialogStore: ModalDialogStore) {
  }

  ngOnInit() {
  }

  public closeModal() {
    if (this.modalDialogStore.cancelCallback) {
      this.modalDialogStore.cancelCallback();
    }
    this.modalDialogStore.close();
  }

  public execCallback() {
    this.modalDialogStore.callback(this.modalDialogStore.currentData);
    this.modalDialogStore.close();
  }
}
