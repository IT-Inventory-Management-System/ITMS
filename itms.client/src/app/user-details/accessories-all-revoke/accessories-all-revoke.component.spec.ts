import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesAllRevokeComponent } from './accessories-all-revoke.component';

describe('AccessoriesAllRevokeComponent', () => {
  let component: AccessoriesAllRevokeComponent;
  let fixture: ComponentFixture<AccessoriesAllRevokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesAllRevokeComponent]
    });
    fixture = TestBed.createComponent(AccessoriesAllRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
