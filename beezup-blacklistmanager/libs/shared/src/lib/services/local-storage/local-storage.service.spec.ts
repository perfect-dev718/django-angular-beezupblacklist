import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

xdescribe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  xit('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
