import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTypeComponent } from './category-type.component';

describe('CategoryTypeComponent', () => {
  let component: CategoryTypeComponent;
  let fixture: ComponentFixture<CategoryTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryTypeComponent]
    });
    fixture = TestBed.createComponent(CategoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
