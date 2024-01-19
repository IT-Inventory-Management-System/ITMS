import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopSearchBoxComponent } from './laptop-search-box.component';

describe('LaptopSearchBoxComponent', () => {
  let component: LaptopSearchBoxComponent;
  let fixture: ComponentFixture<LaptopSearchBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaptopSearchBoxComponent]
    });
    fixture = TestBed.createComponent(LaptopSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
