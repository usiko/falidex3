import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CirculaireRepresentationComponent } from './circulaire-representation.component';

describe('CirculaireRepresentationComponent', () => {
  let component: CirculaireRepresentationComponent;
  let fixture: ComponentFixture<CirculaireRepresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirculaireRepresentationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CirculaireRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
