import { TestBed } from '@angular/core/testing';
import { DataLoaderStoreService } from './data-loader-store.service';



describe('DataStoreService', () => {
    let service: DataLoaderStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataLoaderStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
