import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastdateComponent } from './lastdate.component';

describe('LastdateComponent', () => {
  let component: LastdateComponent;
  let fixture: ComponentFixture<LastdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastdateComponent]
    });
    fixture = TestBed.createComponent(LastdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
