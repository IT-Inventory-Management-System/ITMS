import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentdeviceComponent } from './currentdevice.component';

describe('CurrentdeviceComponent', () => {
  let component: CurrentdeviceComponent;
  let fixture: ComponentFixture<CurrentdeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentdeviceComponent]
    });
    fixture = TestBed.createComponent(CurrentdeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
