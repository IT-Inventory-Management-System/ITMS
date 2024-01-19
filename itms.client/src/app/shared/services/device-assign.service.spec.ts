import { TestBed } from '@angular/core/testing';

import { DeviceAssignService } from './device-assign.service';

describe('DeviceAssignService', () => {
  let service: DeviceAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
