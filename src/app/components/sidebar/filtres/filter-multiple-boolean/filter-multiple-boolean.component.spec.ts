import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterMultipleBooleanComponent } from './filter-multiple-boolean.component';

describe('FilterMultipleBooleanComponent', () => {
  let component: FilterMultipleBooleanComponent;
  let fixture: ComponentFixture<FilterMultipleBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMultipleBooleanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterMultipleBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
