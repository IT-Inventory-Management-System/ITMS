import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesSearchBoxComponent } from './accessories-search-box.component';

describe('AccessoriesSearchBoxComponent', () => {
  let component: AccessoriesSearchBoxComponent;
  let fixture: ComponentFixture<AccessoriesSearchBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesSearchBoxComponent]
    });
    fixture = TestBed.createComponent(AccessoriesSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
