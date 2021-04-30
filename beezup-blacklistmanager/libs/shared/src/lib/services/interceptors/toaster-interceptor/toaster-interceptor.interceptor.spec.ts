import { TestBed, inject } from '@angular/core/testing';

import { ToasterInterceptor } from './toaster-interceptor.interceptor';

xdescribe('ToasterInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToasterInterceptor]
    });
  });

  xit('should be created', inject([ToasterInterceptor], (service: ToasterInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
