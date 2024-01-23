import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivemodalComponent } from './archivemodal.component';

describe('ArchivemodalComponent', () => {
  let component: ArchivemodalComponent;
  let fixture: ComponentFixture<ArchivemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivemodalComponent]
    });
    fixture = TestBed.createComponent(ArchivemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
