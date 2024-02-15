import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListPanelComponent } from './admin-list-panel.component';

describe('AdminListPanelComponent', () => {
  let component: AdminListPanelComponent;
  let fixture: ComponentFixture<AdminListPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminListPanelComponent]
    });
    fixture = TestBed.createComponent(AdminListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
