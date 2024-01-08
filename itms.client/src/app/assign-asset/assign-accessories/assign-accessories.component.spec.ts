import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAccessoriesComponent } from './assign-accessories.component';

describe('AssignAccessoriesComponent', () => {
  let component: AssignAccessoriesComponent;
  let fixture: ComponentFixture<AssignAccessoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignAccessoriesComponent]
    });
    fixture = TestBed.createComponent(AssignAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
