import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobileDevicesComponent } from './add-mobile-devices.component';

describe('AddMobileDevicesComponent', () => {
  let component: AddMobileDevicesComponent;
  let fixture: ComponentFixture<AddMobileDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMobileDevicesComponent]
    });
    fixture = TestBed.createComponent(AddMobileDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
