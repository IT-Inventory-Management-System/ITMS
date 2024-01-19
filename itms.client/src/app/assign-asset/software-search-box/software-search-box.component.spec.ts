import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSearchBoxComponent } from './software-search-box.component';

describe('SoftwareSearchBoxComponent', () => {
  let component: SoftwareSearchBoxComponent;
  let fixture: ComponentFixture<SoftwareSearchBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareSearchBoxComponent]
    });
    fixture = TestBed.createComponent(SoftwareSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
