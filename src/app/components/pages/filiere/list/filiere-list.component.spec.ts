import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereListComponent } from './filiere-list.component';

describe('FiliereListComponent', () => {
    let component: FiliereListComponent;
    let fixture: ComponentFixture<FiliereListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FiliereListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FiliereListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
