// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private selectedCountrySubject = new BehaviorSubject<string>('');
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }
}

