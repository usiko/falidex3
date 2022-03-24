import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymboleItemGalleryComponent } from './symbole-item-gallery.component';

describe('SymboleItemGalleryComponent', () => {
    let component: SymboleItemGalleryComponent;
    let fixture: ComponentFixture<SymboleItemGalleryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SymboleItemGalleryComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SymboleItemGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
