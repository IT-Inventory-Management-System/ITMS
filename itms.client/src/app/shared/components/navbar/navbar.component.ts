import { Component } from '@angular/core';
import { SelectedCountryService } from '../../services/selected-country.service';
import { LoginService } from '../../services/login.service';
import { UserStoreService } from '../../services/user-store.service';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  selectedLocation: string = "";
  showDropdown = false;
  firstName: string = "";
  lastName: string = "";
  role: string = "";

  loggedUser: any;
  constructor(private selectedCountryService: SelectedCountryService, private loginService: LoginService, private userStore: UserStoreService, private renderer: Renderer2, private elementRef: ElementRef) {

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

    this.userStore.getRoleFromStore().subscribe(val => {
      let loggedInUserRole = this.loginService.getRoleFromToken();
      this.role = val || loggedInUserRole;
    })

    this.userStore.getLocationNameFromStore().subscribe(val => {
      let loggedInUserLocation = this.loginService.getLocationNameFromToken();
      this.selectedLocation = val || loggedInUserLocation;
      this.selectedCountryService.setSelectedCountry(this.selectedLocation);
    })
    this.renderer.listen('document', 'click', (event) => {
      if (!this.isOptionsVisible || this.elementRef.nativeElement.contains(event.target)) {
        return;
      }
      this.isOptionsVisible = false;
    });

    this.renderer.listen('document', 'click', (event) => {
      if (!this.showDropdown || this.elementRef.nativeElement.contains(event.target)) {
        return;
      }
      this.showDropdown = false;
    });

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

  quickActionsDropdown() {
    this.isOptionsVisible = !this.isOptionsVisible;
  }

}
