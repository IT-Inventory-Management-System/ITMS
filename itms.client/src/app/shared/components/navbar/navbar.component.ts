import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isOptionsVisible: boolean = false;
  handleOptionClick(option: string) {
    // Handle the click for each option
    if (option === 'add-assets') {
      // Handle Add Assets option
      console.log('Add Assets clicked');
    } else if (option === 'manage-assets') {
      // Handle Manage Assets option
      console.log('Manage Assets clicked');
    }

    // Close the options div after handling the click
    this.isOptionsVisible = false;
  }

  onRadioChange(event: any) {
    const selectedCountry = event.target.value;

    // Store the selected country in local storage
    localStorage.setItem('selectedCountry', selectedCountry);
  }
}
