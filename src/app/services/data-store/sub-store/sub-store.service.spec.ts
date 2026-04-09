import { TestBed } from '@angular/core/testing';
import { SubStoreService } from './sub-store.service';



describe('SubStoreService', () => {
    let service: SubStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SubStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
