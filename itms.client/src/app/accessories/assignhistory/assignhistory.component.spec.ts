import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignhistoryComponent } from './assignhistory.component';

describe('AssignhistoryComponent', () => {
  let component: AssignhistoryComponent;
  let fixture: ComponentFixture<AssignhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignhistoryComponent]
    });
    fixture = TestBed.createComponent(AssignhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
