import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessoryBrandFormComponent } from './add-accessory-brand-form.component';

describe('AddAccessoryBrandFormComponent', () => {
  let component: AddAccessoryBrandFormComponent;
  let fixture: ComponentFixture<AddAccessoryBrandFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccessoryBrandFormComponent]
    });
    fixture = TestBed.createComponent(AddAccessoryBrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
