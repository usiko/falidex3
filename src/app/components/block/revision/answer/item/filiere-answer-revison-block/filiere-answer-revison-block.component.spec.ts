import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiliereAnswerRevisonBlockComponent } from './filiere-answer-revison-block.component';

describe('FiliereAnswerRevisonBlockComponent', () => {
  let component: FiliereAnswerRevisonBlockComponent;
  let fixture: ComponentFixture<FiliereAnswerRevisonBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereAnswerRevisonBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiliereAnswerRevisonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
