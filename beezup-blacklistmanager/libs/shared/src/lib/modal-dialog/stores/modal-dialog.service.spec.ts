import { TestBed, inject } from '@angular/core/testing';

import { ModalDialogStore } from './modal-dialog.service';

xdescribe('ModalDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalDialogStore]
    });
  });

  xit('should be created', inject([ModalDialogStore], (service: ModalDialogStore) => {
    expect(service).toBeTruthy();
  }));
});
