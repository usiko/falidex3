import { TestBed } from '@angular/core/testing';

import { SwServiceService } from './sw-service.service';

describe('SwServiceService', () => {
  let service: SwServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
