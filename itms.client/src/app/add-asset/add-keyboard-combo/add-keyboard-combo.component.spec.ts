import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeyboardComboComponent } from './add-keyboard-combo.component';

describe('AddKeyboardComboComponent', () => {
  let component: AddKeyboardComboComponent;
  let fixture: ComponentFixture<AddKeyboardComboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKeyboardComboComponent]
    });
    fixture = TestBed.createComponent(AddKeyboardComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
