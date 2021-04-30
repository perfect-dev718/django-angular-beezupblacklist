import {Component, OnInit} from '@angular/core';
import {ModalDialogStore} from '../../stores/modal-dialog.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'tr-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  public data: any;
  public callback: any;
  public cancelCallback: any;

  constructor(private modalDialogStore: ModalDialogStore,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.data = this.modalDialogStore.currentData;
    this.translate.get(this.data.body, this.data.translationParams || {}).subscribe((res: string) => {
      this.data.body = res;
    });
    this.callback = this.modalDialogStore.callback;
    this.cancelCallback = this.modalDialogStore.cancelCallback;
  }

  public closeModal() {
    if (this.cancelCallback) {
      this.cancelCallback(false);
    }
    this.modalDialogStore.close();
  }

  public execCallback() {
    this.callback(true);
    this.modalDialogStore.close();
  }
}
