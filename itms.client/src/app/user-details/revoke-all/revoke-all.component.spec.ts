import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeAllComponent } from './revoke-all.component';

describe('RevokeAllComponent', () => {
  let component: RevokeAllComponent;
  let fixture: ComponentFixture<RevokeAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevokeAllComponent]
    });
    fixture = TestBed.createComponent(RevokeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
