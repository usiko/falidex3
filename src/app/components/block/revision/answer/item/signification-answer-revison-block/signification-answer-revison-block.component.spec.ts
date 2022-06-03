import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignificationAnswerRevisonBlockComponent } from './signification-answer-revison-block.component';

describe('SignificationAnswerRevisonBlockComponent', () => {
  let component: SignificationAnswerRevisonBlockComponent;
  let fixture: ComponentFixture<SignificationAnswerRevisonBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignificationAnswerRevisonBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignificationAnswerRevisonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
