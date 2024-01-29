import { TestBed } from '@angular/core/testing';

import { SelectedCountryService } from './selected-country.service';

describe('SelectedCountryService', () => {
  let service: SelectedCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
