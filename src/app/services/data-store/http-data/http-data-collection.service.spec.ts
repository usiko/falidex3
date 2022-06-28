import { TestBed } from '@angular/core/testing';

import { HttpDataCollectionService } from './http-data-collection.service';

describe('HttpDataCollectionService', () => {
  let service: HttpDataCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
