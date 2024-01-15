import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDeviceComponent } from './current-device.component';

describe('CurrentDeviceComponent', () => {
  let component: CurrentDeviceComponent;
  let fixture: ComponentFixture<CurrentDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentDeviceComponent]
    });
    fixture = TestBed.createComponent(CurrentDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
