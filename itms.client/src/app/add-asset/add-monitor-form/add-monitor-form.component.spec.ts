import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonitorFormComponent } from './add-monitor-form.component';

describe('AddMonitorFormComponent', () => {
  let component: AddMonitorFormComponent;
  let fixture: ComponentFixture<AddMonitorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMonitorFormComponent]
    });
    fixture = TestBed.createComponent(AddMonitorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
