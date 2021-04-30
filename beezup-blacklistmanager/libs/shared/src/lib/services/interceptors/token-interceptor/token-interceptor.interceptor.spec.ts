import { TestBed, inject } from '@angular/core/testing';

import { TokenInterceptor } from './token-interceptor.interceptor';

xdescribe('TokenInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor]
    });
  });

  xit('should be created', inject([TokenInterceptor], (service: TokenInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
