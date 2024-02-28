import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPanelComponent } from './activity-panel.component';

describe('ActivityPanelComponent', () => {
  let component: ActivityPanelComponent;
  let fixture: ComponentFixture<ActivityPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityPanelComponent]
    });
    fixture = TestBed.createComponent(ActivityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
