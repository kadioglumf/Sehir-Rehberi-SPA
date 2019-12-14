/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthHtppInterceptorService } from './AuthHtppInterceptor.service';

describe('Service: AuthHtppInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHtppInterceptorService]
    });
  });

  it('should ...', inject([AuthHtppInterceptorService], (service: AuthHtppInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
