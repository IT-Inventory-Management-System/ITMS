import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobileModelComponent } from './add-mobile-model.component';

describe('AddMobileModelComponent', () => {
  let component: AddMobileModelComponent;
  let fixture: ComponentFixture<AddMobileModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMobileModelComponent]
    });
    fixture = TestBed.createComponent(AddMobileModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
