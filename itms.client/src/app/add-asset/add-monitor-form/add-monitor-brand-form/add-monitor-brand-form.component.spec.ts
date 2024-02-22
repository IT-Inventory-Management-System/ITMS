import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonitorBrandFormComponent } from './add-monitor-brand-form.component';

describe('AddMonitorBrandFormComponent', () => {
  let component: AddMonitorBrandFormComponent;
  let fixture: ComponentFixture<AddMonitorBrandFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMonitorBrandFormComponent]
    });
    fixture = TestBed.createComponent(AddMonitorBrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
