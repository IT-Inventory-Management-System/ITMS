import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoftwareModelComponent } from './add-software-model.component';

describe('AddSoftwareModelComponent', () => {
  let component: AddSoftwareModelComponent;
  let fixture: ComponentFixture<AddSoftwareModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSoftwareModelComponent]
    });
    fixture = TestBed.createComponent(AddSoftwareModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
