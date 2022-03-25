import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymbolBlockItemGalleryComponent } from './symbole-block-item-gallery.component';

describe('SymbolBlockItemGalleryComponent', () => {
    let component: SymbolBlockItemGalleryComponent;
    let fixture: ComponentFixture<SymbolBlockItemGalleryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SymbolBlockItemGalleryComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SymbolBlockItemGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
