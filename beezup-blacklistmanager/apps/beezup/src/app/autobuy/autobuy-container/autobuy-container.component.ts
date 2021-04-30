import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MODAL_DIALOG_NAMES} from "../../../../../../libs/shared/src/lib/modal-dialog/constants/modal-dialog-names.enum";
import {IReactionDisposer, reaction} from "mobx";
import {ModalDialogStore} from "../../../../../../libs/shared/src/lib/modal-dialog/stores/modal-dialog.service";

@Component({
  selector: 'beezup-autobuy-container',
  templateUrl: './autobuy-container.component.html',
  styleUrls: ['./autobuy-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutobuyContainerComponent implements OnInit, OnDestroy {
  public MODAL_DIALOG_NAMES = MODAL_DIALOG_NAMES;
  private modalReaction: IReactionDisposer;
  public currentDialog: any;


  constructor(private modalDialogStore: ModalDialogStore) { }

  ngOnInit(): void {
    this.eventHandlers()
  }

  private eventHandlers(): void {
    this.modalReaction = reaction(() => this.modalDialogStore.currentDialog, () => {
      this.currentDialog = this.modalDialogStore.currentDialog;
    });
  }

  ngOnDestroy():void {
    if (this.modalReaction) {
      this.modalReaction();
    }
  }

}
