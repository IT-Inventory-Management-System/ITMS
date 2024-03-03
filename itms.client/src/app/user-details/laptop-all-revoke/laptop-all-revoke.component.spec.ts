import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopAllRevokeComponent } from './laptop-all-revoke.component';

describe('LaptopAllRevokeComponent', () => {
  let component: LaptopAllRevokeComponent;
  let fixture: ComponentFixture<LaptopAllRevokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaptopAllRevokeComponent]
    });
    fixture = TestBed.createComponent(LaptopAllRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
