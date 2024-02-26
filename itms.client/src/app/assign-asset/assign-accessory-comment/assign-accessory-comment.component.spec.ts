import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAccessoryCommentComponent } from './assign-accessory-comment.component';

describe('AssignAccessoryCommentComponent', () => {
  let component: AssignAccessoryCommentComponent;
  let fixture: ComponentFixture<AssignAccessoryCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignAccessoryCommentComponent]
    });
    fixture = TestBed.createComponent(AssignAccessoryCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
