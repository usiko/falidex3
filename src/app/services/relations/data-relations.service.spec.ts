import { TestBed } from '@angular/core/testing';

import { DataRelationsService } from './data-relations.service';

describe('DataRelationsService', () => {
  let service: DataRelationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRelationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
