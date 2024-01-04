import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesDetailsComponent } from './accessories-details.component';

describe('AccessoriesDetailsComponent', () => {
  let component: AccessoriesDetailsComponent;
  let fixture: ComponentFixture<AccessoriesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesDetailsComponent]
    });
    fixture = TestBed.createComponent(AccessoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
