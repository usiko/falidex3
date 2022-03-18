import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereViewComponent } from './circulaire-filiere-view.component';

describe('FiliereViewComponent', () => {
  let component: FiliereViewComponent;
  let fixture: ComponentFixture<FiliereViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliereViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
