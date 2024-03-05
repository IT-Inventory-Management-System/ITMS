import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignableModalComponent } from './unassignable-modal.component';

describe('UnassignableModalComponent', () => {
  let component: UnassignableModalComponent;
  let fixture: ComponentFixture<UnassignableModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnassignableModalComponent]
    });
    fixture = TestBed.createComponent(UnassignableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
