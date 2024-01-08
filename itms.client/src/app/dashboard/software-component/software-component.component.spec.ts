import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareComponentComponent } from './software-component.component';

describe('SoftwareComponentComponent', () => {
  let component: SoftwareComponentComponent;
  let fixture: ComponentFixture<SoftwareComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareComponentComponent]
    });
    fixture = TestBed.createComponent(SoftwareComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
