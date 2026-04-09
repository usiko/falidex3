import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiliereDetailsBlockComponent } from './filiere-details-block.component';

describe('FiliereDetailsBlockComponent', () => {
  let component: FiliereDetailsBlockComponent;
  let fixture: ComponentFixture<FiliereDetailsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereDetailsBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiliereDetailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
