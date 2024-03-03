import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeRoleModalComponent } from './revoke-role-modal.component';

describe('RevokeRoleModalComponent', () => {
  let component: RevokeRoleModalComponent;
  let fixture: ComponentFixture<RevokeRoleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevokeRoleModalComponent]
    });
    fixture = TestBed.createComponent(RevokeRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
