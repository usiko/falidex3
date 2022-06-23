import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FiliereBlockItemListComponent } from './filiere-block-item-list.component';



describe('FiliereItemComponent', () => {
    let component: FiliereBlockItemListComponent;
    let fixture: ComponentFixture<FiliereBlockItemListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FiliereBlockItemListComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FiliereBlockItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
