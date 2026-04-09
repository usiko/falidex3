import { TestBed } from '@angular/core/testing';

import { SignificationCollectionService } from './signification-collection.service';

describe('SignificationCollectionService', () => {
  let service: SignificationCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignificationCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
