import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleModalComponent } from './sample-modal.component';

describe('SampleModalComponent', () => {
  let component: SampleModalComponent;
  let fixture: ComponentFixture<SampleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleModalComponent]
    });
    fixture = TestBed.createComponent(SampleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
