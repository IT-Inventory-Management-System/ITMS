import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNameCardComponent } from './admin-name-card.component';

describe('AdminNameCardComponent', () => {
  let component: AdminNameCardComponent;
  let fixture: ComponentFixture<AdminNameCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNameCardComponent]
    });
    fixture = TestBed.createComponent(AdminNameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
