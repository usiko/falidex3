import { TestBed } from '@angular/core/testing';

import { SubjectsStoreService } from './subjects-store.service';

describe('SubjectsStoreService', () => {
  let service: SubjectsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
