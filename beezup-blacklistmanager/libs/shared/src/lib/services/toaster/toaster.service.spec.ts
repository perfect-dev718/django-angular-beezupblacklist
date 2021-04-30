import { TestBed, inject } from '@angular/core/testing';

import { ToasterService } from './toaster.service';

xdescribe('ToasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToasterService]
    });
  });

  xit('should be created', inject([ToasterService], (service: ToasterService) => {
    expect(service).toBeTruthy();
  }));
});
