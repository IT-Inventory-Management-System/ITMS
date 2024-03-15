import { TestBed } from '@angular/core/testing';

import { GetLocalTimeService } from './get-local-time.service';

describe('GetLocalTimeService', () => {
  let service: GetLocalTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLocalTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
