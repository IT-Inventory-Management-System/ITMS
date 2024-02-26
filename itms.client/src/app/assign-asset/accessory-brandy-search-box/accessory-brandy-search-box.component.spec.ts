import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryBrandySearchBoxComponent } from './accessory-brandy-search-box.component';

describe('AccessoryBrandySearchBoxComponent', () => {
  let component: AccessoryBrandySearchBoxComponent;
  let fixture: ComponentFixture<AccessoryBrandySearchBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoryBrandySearchBoxComponent]
    });
    fixture = TestBed.createComponent(AccessoryBrandySearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
