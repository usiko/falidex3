import { TestBed } from '@angular/core/testing';

import { SymbolCollectionService } from './symbol-collection.service';

describe('SymbolCollectionService', () => {
    let service: SymbolCollectionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SymbolCollectionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
