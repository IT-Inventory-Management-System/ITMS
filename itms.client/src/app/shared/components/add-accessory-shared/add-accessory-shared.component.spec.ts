import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessorySharedComponent } from './add-accessory-shared.component';

describe('AddAccessorySharedComponent', () => {
  let component: AddAccessorySharedComponent;
  let fixture: ComponentFixture<AddAccessorySharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccessorySharedComponent]
    });
    fixture = TestBed.createComponent(AddAccessorySharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
