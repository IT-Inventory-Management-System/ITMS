import { Component } from '@angular/core';
import * as myGlobals from '../../../../Global';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isOptionsVisible: boolean = false;

  constructor(private LocationService: LocationService) { }

  onRadioChange(event: any) {
    const selectedCountry = event.target.value;
    localStorage.setItem('selectedCountry', selectedCountry);
    //this.LocationService.setSelectedCountry(selectedCountry);
    //alert(selectedCountry);
    location.reload();
  }
}
