import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoriesFilterComponent } from './accesories-filter.component';

describe('AccesoriesFilterComponent', () => {
  let component: AccesoriesFilterComponent;
  let fixture: ComponentFixture<AccesoriesFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccesoriesFilterComponent]
    });
    fixture = TestBed.createComponent(AccesoriesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
