import { TestBed } from '@angular/core/testing';

import { AdminDetailService } from './admin-detail.service';

describe('AdminDetailService', () => {
  let service: AdminDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
