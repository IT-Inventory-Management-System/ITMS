import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareAssignHistoryComponent } from './software-assign-history.component';

describe('SoftwareAssignHistoryComponent', () => {
  let component: SoftwareAssignHistoryComponent;
  let fixture: ComponentFixture<SoftwareAssignHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareAssignHistoryComponent]
    });
    fixture = TestBed.createComponent(SoftwareAssignHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
