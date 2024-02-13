import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesRevokeComponent } from './accessories-revoke.component';

describe('AccessoriesRevokeComponent', () => {
  let component: AccessoriesRevokeComponent;
  let fixture: ComponentFixture<AccessoriesRevokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesRevokeComponent]
    });
    fixture = TestBed.createComponent(AccessoriesRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
