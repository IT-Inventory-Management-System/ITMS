import { Component } from '@angular/core';
import { SelectedCountryService } from '../../services/selected-country.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  loggedUser: any;
  constructor(private selectedCountryService: SelectedCountryService) {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      this.loggedUser = JSON.parse(storedUser);
    } 
  }

  isOptionsVisible: boolean = false;

  onRadioChange(event: any) {
    const selectedCountry = event.target.value;
    localStorage.setItem('selectedCountry', selectedCountry);
    this.selectedCountryService.setSelectedCountry(selectedCountry);
  }
}
