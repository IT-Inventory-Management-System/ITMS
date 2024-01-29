import { TestBed } from '@angular/core/testing';

import { CloseFlagService } from './close-flag.service';

describe('CloseFlagService', () => {
  let service: CloseFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
