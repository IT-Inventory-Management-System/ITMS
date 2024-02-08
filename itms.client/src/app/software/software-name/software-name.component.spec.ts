import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareNameComponent } from './software-name.component';

describe('SoftwareNameComponent', () => {
  let component: SoftwareNameComponent;
  let fixture: ComponentFixture<SoftwareNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareNameComponent]
    });
    fixture = TestBed.createComponent(SoftwareNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
