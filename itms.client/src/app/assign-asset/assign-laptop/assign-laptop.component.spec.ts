import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLaptopComponent } from './assign-laptop.component';

describe('AssignLaptopComponent', () => {
  let component: AssignLaptopComponent;
  let fixture: ComponentFixture<AssignLaptopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLaptopComponent]
    });
    fixture = TestBed.createComponent(AssignLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
