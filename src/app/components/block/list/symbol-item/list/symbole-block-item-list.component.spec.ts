import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SymbolBlockItemListComponent } from './symbole-block-item-list.component';



describe('SymboleItemComponent', () => {
    let component: SymbolBlockItemListComponent;
    let fixture: ComponentFixture<SymbolBlockItemListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SymbolBlockItemListComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SymbolBlockItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
