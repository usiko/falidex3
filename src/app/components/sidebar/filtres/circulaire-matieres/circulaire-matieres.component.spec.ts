import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CirculaireMatieresComponent } from './circulaire-matieres.component';

describe('CirculaireMatieresComponent', () => {
  let component: CirculaireMatieresComponent;
  let fixture: ComponentFixture<CirculaireMatieresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirculaireMatieresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CirculaireMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
