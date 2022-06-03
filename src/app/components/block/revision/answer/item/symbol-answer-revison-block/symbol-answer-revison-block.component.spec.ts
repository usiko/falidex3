import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymbolAnswerRevisonBlockComponent } from './symbol-answer-revison-block.component';

describe('SymbolAnswerRevisonBlockComponent', () => {
  let component: SymbolAnswerRevisonBlockComponent;
  let fixture: ComponentFixture<SymbolAnswerRevisonBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolAnswerRevisonBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolAnswerRevisonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
