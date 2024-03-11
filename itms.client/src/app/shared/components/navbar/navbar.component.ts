import { Component } from '@angular/core';
import { SelectedCountryService } from '../../services/selected-country.service';
import { LoginService } from '../../services/login.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  selectedLocation: string = "India";
  showDropdown = false;
  firstName: string = "";
  lastName: string = "";

  loggedUser: any;
  constructor(private selectedCountryService: SelectedCountryService, private loginService: LoginService, private userStore: UserStoreService) {
    //const storedUser = localStorage.getItem("user");
    //if (storedUser !== null) {
    //  this.loggedUser = JSON.parse(storedUser);
    //}
  }

  ngOnInit() {
    this.userStore.getFirstNameFromStore().subscribe(val => {
      let firstNameFromToken = this.loginService.getFirstNameFromToken();
      this.firstName = val || firstNameFromToken;
    })

    this.userStore.getLastNameFromStore().subscribe(val => {
      let lastNameFromToken = this.loginService.getLastNameFromToken();
      this.lastName = val || lastNameFromToken;
    })
  }

  isOptionsVisible: boolean = false;

  onRadioChange(event: any) {
    const selectedCountry = event.target.value;
    localStorage.setItem('selectedCountry', selectedCountry);
    this.selectedCountryService.setSelectedCountry(selectedCountry);
    this.selectedLocation = selectedCountry;
  }

  logout() {
    this.showDropdown = false;
    this.loginService.signOut();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
