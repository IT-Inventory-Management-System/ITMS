import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAssetComponent } from './assign-asset.component';

describe('AssignAssetComponent', () => {
  let component: AssignAssetComponent;
  let fixture: ComponentFixture<AssignAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignAssetComponent]
    });
    fixture = TestBed.createComponent(AssignAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
