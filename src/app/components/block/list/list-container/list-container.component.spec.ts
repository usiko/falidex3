import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListDataComponent } from './list-data.component';

describe('ListDataComponent', () => {
    let component: ListDataComponent;
    let fixture: ComponentFixture<ListDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListDataComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
