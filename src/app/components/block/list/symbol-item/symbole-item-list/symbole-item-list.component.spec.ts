import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymboleItemComponent } from './symbole-item.component';

describe('SymboleItemComponent', () => {
  let component: SymboleItemComponent;
  let fixture: ComponentFixture<SymboleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymboleItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymboleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
