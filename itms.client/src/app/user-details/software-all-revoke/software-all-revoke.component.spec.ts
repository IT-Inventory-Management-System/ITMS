import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareAllRevokeComponent } from './software-all-revoke.component';

describe('SoftwareAllRevokeComponent', () => {
  let component: SoftwareAllRevokeComponent;
  let fixture: ComponentFixture<SoftwareAllRevokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareAllRevokeComponent]
    });
    fixture = TestBed.createComponent(SoftwareAllRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
