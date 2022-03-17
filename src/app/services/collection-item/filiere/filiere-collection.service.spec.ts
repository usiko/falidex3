import { TestBed } from '@angular/core/testing';

import { FiliereCollectionService } from './filiere-collection.service';

describe('FiliereCollectionService', () => {
    let service: FiliereCollectionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FiliereCollectionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
