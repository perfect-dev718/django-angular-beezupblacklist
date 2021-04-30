import {Component, Input, OnInit} from '@angular/core';
import {ModalButtonsText, ModalDialogStore} from '../../stores/modal-dialog.service';

@Component({
  selector: 'tr-warning-with-icon',
  templateUrl: './warning-with-icon.component.html',
  styleUrls: ['./warning-with-icon.component.scss']
})
export class WarningWithIconComponent implements OnInit {
  public text: any;
  public callback: any;

  @Input() additionalStore: ModalDialogStore;
  public buttonsText: ModalButtonsText;

  constructor(private modalDialogStore: ModalDialogStore) {

  }

  ngOnInit() {
    if (this.additionalStore) this.modalDialogStore = this.additionalStore;
    this.text = this.modalDialogStore.currentData;
    this.buttonsText = this.modalDialogStore.modalButtonsText;
    this.callback = this.modalDialogStore.callback;
  }


  public close() {
    this.modalDialogStore.close();
  }

  public execCallback() {
    this.callback();
    this.close();
  }

}
