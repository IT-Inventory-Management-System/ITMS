import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedCountryService {

  constructor() { }

  private selectedCountrySubject = new BehaviorSubject<string>('India');
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }

}
