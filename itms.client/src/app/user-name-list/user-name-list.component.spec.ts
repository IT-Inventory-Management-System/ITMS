import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameListComponent } from './user-name-list.component';

describe('UserNameListComponent', () => {
  let component: UserNameListComponent;
  let fixture: ComponentFixture<UserNameListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNameListComponent]
    });
    fixture = TestBed.createComponent(UserNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
