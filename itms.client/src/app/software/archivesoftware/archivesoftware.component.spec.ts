import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesoftwareComponent } from './archivesoftware.component';

describe('ArchivesoftwareComponent', () => {
  let component: ArchivesoftwareComponent;
  let fixture: ComponentFixture<ArchivesoftwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivesoftwareComponent]
    });
    fixture = TestBed.createComponent(ArchivesoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
