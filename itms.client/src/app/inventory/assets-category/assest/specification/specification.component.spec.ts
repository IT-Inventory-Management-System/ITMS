import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationComponent } from './specification.component';

describe('SpecificationComponent', () => {
  let component: SpecificationComponent;
  let fixture: ComponentFixture<SpecificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificationComponent]
    });
    fixture = TestBed.createComponent(SpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
