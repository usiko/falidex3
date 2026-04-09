import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymboleDetailsBlockComponent } from './symbole-details-block.component';

describe('SymboleDetailsBlockComponent', () => {
  let component: SymboleDetailsBlockComponent;
  let fixture: ComponentFixture<SymboleDetailsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymboleDetailsBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymboleDetailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
