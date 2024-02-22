import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionsPanelComponent } from './admin-permissions-panel.component';

describe('AdminPermissionsPanelComponent', () => {
  let component: AdminPermissionsPanelComponent;
  let fixture: ComponentFixture<AdminPermissionsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPermissionsPanelComponent]
    });
    fixture = TestBed.createComponent(AdminPermissionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
