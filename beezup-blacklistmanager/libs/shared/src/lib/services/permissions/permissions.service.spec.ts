import { TestBed, inject } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';

xdescribe('PermissionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionsService]
    });
  });

  xit('should be created', inject([PermissionsService], (service: PermissionsService) => {
    expect(service).toBeTruthy();
  }));
});
