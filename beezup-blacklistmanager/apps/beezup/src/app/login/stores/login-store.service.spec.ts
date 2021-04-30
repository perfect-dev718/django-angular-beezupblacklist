import { TestBed, inject } from '@angular/core/testing';

import { LoginStoreService } from './login-store.service';

xdescribe('LoginStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginStoreService]
    });
  });

  xit('should be created', inject([LoginStoreService], (service: LoginStoreService) => {
    expect(service).toBeTruthy();
  }));
});
