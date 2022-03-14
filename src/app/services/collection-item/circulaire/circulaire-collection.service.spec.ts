import { TestBed } from '@angular/core/testing';

import { CirculaireCollectionService } from './circulaire-collection.service';

describe('CirculaireCollectionService', () => {
  let service: CirculaireCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CirculaireCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
