import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SymboleItemListComponent } from './symbole-item-list.component';



describe('SymboleItemComponent', () => {
    let component: SymboleItemListComponent;
    let fixture: ComponentFixture<SymboleItemListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SymboleItemListComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SymboleItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
