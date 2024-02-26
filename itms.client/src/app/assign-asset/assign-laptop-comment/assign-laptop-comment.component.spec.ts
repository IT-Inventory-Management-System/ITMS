import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLaptopCommentComponent } from './assign-laptop-comment.component';

describe('AssignLaptopCommentComponent', () => {
  let component: AssignLaptopCommentComponent;
  let fixture: ComponentFixture<AssignLaptopCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLaptopCommentComponent]
    });
    fixture = TestBed.createComponent(AssignLaptopCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
