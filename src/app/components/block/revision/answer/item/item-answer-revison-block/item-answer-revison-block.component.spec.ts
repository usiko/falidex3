import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemAnswerRevisonBlockComponent } from './item-answer-revison-block.component';

describe('ItemAnswerRevisonBlockComponent', () => {
  let component: ItemAnswerRevisonBlockComponent;
  let fixture: ComponentFixture<ItemAnswerRevisonBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAnswerRevisonBlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemAnswerRevisonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
