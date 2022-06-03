import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymbolSensAnswerRevisonBlockComponent } from './symbol-sens-answer-revison-block.component';

describe('SymbolSensAnswerRevisonBlockComponent', () => {
  let component: SymbolSensAnswerRevisonBlockComponent;
  let fixture: ComponentFixture<SymbolSensAnswerRevisonBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolSensAnswerRevisonBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolSensAnswerRevisonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
