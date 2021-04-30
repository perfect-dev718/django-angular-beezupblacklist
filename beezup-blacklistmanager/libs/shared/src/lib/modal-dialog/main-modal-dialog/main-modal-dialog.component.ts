import {Component, ContentChild, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {IReactionDisposer, reaction} from 'mobx';
import {ModalDialogStore} from '../stores/modal-dialog.service';

@Component({
  selector: 'tr-main-modal-dialog',
  templateUrl: './main-modal-dialog.component.html',
  styleUrls: ['./main-modal-dialog.component.scss']
})
export class MainModalDialogComponent implements OnInit, OnDestroy {
  @ContentChild(TemplateRef, {static: true}) dialog: ElementRef;

  @Input() additionalStore: ModalDialogStore;

  private reactionKill: IReactionDisposer;

  public currentDialog: any;
  public display: boolean;
  public defaultHeight: number;
  public defaultWidth: number;

  constructor(private modalDialogStore: ModalDialogStore) {

  }

  ngOnInit() {
    if (this.additionalStore) this.modalDialogStore = this.additionalStore;
    this.display = this.modalDialogStore.displayModal;
    this.currentDialog = this.modalDialogStore.currentDialog;
    this.reactionKill = reaction(() => this.modalDialogStore.displayModal, () => {
      this.currentDialog = this.modalDialogStore.currentDialog;
      this.display = this.modalDialogStore.displayModal;
    });
    this.setDefaultSize();
  }

  @HostListener('window:resize')
  public setDefaultSize() {
    this.defaultHeight = window.innerHeight - 100;
    this.defaultWidth = window.innerWidth - 50;
  }

  ngOnDestroy() {
    this.reactionKill();
  }

  public modalClosed() {
    this.modalDialogStore.displayModal = false;
    this.display = false;
    this.modalDialogStore.currentData = null;
    this.modalDialogStore.close();
  }

}
