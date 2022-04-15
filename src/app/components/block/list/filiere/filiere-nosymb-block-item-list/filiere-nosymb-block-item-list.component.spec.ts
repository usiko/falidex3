import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiliereNosymbBlockItemListComponent } from './filiere-nosymb-block-item-list.component';

describe('FiliereNosymbBlockItemListComponent', () => {
  let component: FiliereNosymbBlockItemListComponent;
  let fixture: ComponentFixture<FiliereNosymbBlockItemListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereNosymbBlockItemListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiliereNosymbBlockItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
