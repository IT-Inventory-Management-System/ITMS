import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecInfoComponent } from './spec-info.component';

describe('SpecInfoComponent', () => {
  let component: SpecInfoComponent;
  let fixture: ComponentFixture<SpecInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecInfoComponent]
    });
    fixture = TestBed.createComponent(SpecInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
