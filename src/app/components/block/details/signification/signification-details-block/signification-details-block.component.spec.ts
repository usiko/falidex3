import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CirculaireDetailsBlockComponent } from './circulaire-details-block.component';

describe('CirculaireDetailsBlockComponent', () => {
  let component: CirculaireDetailsBlockComponent;
  let fixture: ComponentFixture<CirculaireDetailsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirculaireDetailsBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CirculaireDetailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
