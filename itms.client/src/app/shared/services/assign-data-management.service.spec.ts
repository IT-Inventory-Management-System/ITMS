import { TestBed } from '@angular/core/testing';

import { AssignDataManagementService } from './assign-data-management.service';

describe('AssignDataManagementService', () => {
  let service: AssignDataManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignDataManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
