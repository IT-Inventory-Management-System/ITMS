import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMouseBrandFormComponent } from './add-mouse-brand-form.component';

describe('AddMouseBrandFormComponent', () => {
  let component: AddMouseBrandFormComponent;
  let fixture: ComponentFixture<AddMouseBrandFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMouseBrandFormComponent]
    });
    fixture = TestBed.createComponent(AddMouseBrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
