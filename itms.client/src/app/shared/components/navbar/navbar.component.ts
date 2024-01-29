import { Component } from '@angular/core';
import { SelectedCountryService } from '../../services/selected-country.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private selectedCountryService: SelectedCountryService) { }

  isOptionsVisible: boolean = false;

  onRadioChange(event: any) {
    const selectedCountry = event.target.value;
    localStorage.setItem('selectedCountry', selectedCountry);
    this.selectedCountryService.setSelectedCountry(selectedCountry);
  }
}
