import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoriesnameComponent } from './accesoriesname.component';

describe('AccesoriesnameComponent', () => {
  let component: AccesoriesnameComponent;
  let fixture: ComponentFixture<AccesoriesnameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccesoriesnameComponent]
    });
    fixture = TestBed.createComponent(AccesoriesnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
