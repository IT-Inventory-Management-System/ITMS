import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignableModalComponent } from './assignable-modal.component';

describe('AssignableModalComponent', () => {
  let component: AssignableModalComponent;
  let fixture: ComponentFixture<AssignableModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignableModalComponent]
    });
    fixture = TestBed.createComponent(AssignableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
