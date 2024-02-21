import { TestBed } from '@angular/core/testing';

import { SoftwareSelectedService } from './software-selected.service';

describe('SoftwareSelectedService', () => {
  let service: SoftwareSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
