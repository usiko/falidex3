import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltresComponent } from './filtres.component';

describe('FiltresComponent', () => {
  let component: FiltresComponent;
  let fixture: ComponentFixture<FiltresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
