import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeyboardComboBrandFormComponent } from './add-keyboard-combo-brand-form.component';

describe('AddKeyboardComboBrandFormComponent', () => {
  let component: AddKeyboardComboBrandFormComponent;
  let fixture: ComponentFixture<AddKeyboardComboBrandFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKeyboardComboBrandFormComponent]
    });
    fixture = TestBed.createComponent(AddKeyboardComboBrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
