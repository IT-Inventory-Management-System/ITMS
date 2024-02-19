import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopRevokeComponent } from './laptop-revoke.component';

describe('LaptopRevokeComponent', () => {
  let component: LaptopRevokeComponent;
  let fixture: ComponentFixture<LaptopRevokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaptopRevokeComponent]
    });
    fixture = TestBed.createComponent(LaptopRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
