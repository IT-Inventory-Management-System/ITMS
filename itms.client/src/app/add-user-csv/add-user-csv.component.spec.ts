import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCsvComponent } from './add-user-csv.component';

describe('AddUserCsvComponent', () => {
  let component: AddUserCsvComponent;
  let fixture: ComponentFixture<AddUserCsvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserCsvComponent]
    });
    fixture = TestBed.createComponent(AddUserCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
