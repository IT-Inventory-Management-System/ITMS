import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdInputComponent } from './id-input.component';

describe('IdInputComponent', () => {
  let component: IdInputComponent;
  let fixture: ComponentFixture<IdInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdInputComponent]
    });
    fixture = TestBed.createComponent(IdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
