import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LisContainerComponent } from './list-container.component';

describe('LisContainerComponent', () => {
    let component: LisContainerComponent;
    let fixture: ComponentFixture<LisContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LisContainerComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(LisContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
