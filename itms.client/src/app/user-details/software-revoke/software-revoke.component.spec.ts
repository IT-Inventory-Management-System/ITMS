import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareRevokeComponent } from './software-revoke.component';

describe('SoftwareRevokeComponent', () => {
  let component: SoftwareRevokeComponent;
  let fixture: ComponentFixture<SoftwareRevokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareRevokeComponent]
    });
    fixture = TestBed.createComponent(SoftwareRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
