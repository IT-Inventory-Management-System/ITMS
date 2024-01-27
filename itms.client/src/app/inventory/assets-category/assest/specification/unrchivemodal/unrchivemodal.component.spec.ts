import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnrchivemodalComponent } from './unrchivemodal.component';

describe('UnrchivemodalComponent', () => {
  let component: UnrchivemodalComponent;
  let fixture: ComponentFixture<UnrchivemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnrchivemodalComponent]
    });
    fixture = TestBed.createComponent(UnrchivemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
