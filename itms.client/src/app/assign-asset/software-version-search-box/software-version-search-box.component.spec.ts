import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareVersionSearchBoxComponent } from './software-version-search-box.component';

describe('SoftwareVersionSearchBoxComponent', () => {
  let component: SoftwareVersionSearchBoxComponent;
  let fixture: ComponentFixture<SoftwareVersionSearchBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareVersionSearchBoxComponent]
    });
    fixture = TestBed.createComponent(SoftwareVersionSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
