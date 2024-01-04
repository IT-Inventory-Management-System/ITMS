import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoftwareFormComponent } from './add-software-form.component';

describe('AddSoftwareFormComponent', () => {
  let component: AddSoftwareFormComponent;
  let fixture: ComponentFixture<AddSoftwareFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSoftwareFormComponent]
    });
    fixture = TestBed.createComponent(AddSoftwareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
