import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSoftwareCommentComponent } from './assign-software-comment.component';

describe('AssignSoftwareCommentComponent', () => {
  let component: AssignSoftwareCommentComponent;
  let fixture: ComponentFixture<AssignSoftwareCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignSoftwareCommentComponent]
    });
    fixture = TestBed.createComponent(AssignSoftwareCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
