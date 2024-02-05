import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMouseFormComponent } from './add-mouse-form.component';

describe('AddMouseFormComponent', () => {
  let component: AddMouseFormComponent;
  let fixture: ComponentFixture<AddMouseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMouseFormComponent]
    });
    fixture = TestBed.createComponent(AddMouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
