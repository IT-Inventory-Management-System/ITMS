import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHistoryComponent } from './assign-history.component';

describe('AssignHistoryComponent', () => {
  let component: AssignHistoryComponent;
  let fixture: ComponentFixture<AssignHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignHistoryComponent]
    });
    fixture = TestBed.createComponent(AssignHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
