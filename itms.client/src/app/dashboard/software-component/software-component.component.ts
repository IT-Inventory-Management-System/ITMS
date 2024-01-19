import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-software-component',
  templateUrl: './software-component.component.html',
  styleUrls: ['./software-component.component.css']
})
export class SoftwareComponentComponent {
  @Input() softwareData: any;
  expiringSoftwareCount: number = 0;

  constructor() {
    this.calculateExpiringCount();
  }

  calculateExpiringCount() {
    if (this.softwareData && this.softwareData.length > 0) {
      const currentDate = new Date();
      const fifteenDaysFromNow = new Date();
      fifteenDaysFromNow.setDate(fifteenDaysFromNow.getDate() + 15);

      this.expiringSoftwareCount = this.softwareData.filter((software: any) => {
        // Assuming 'expiryDate' is the property in softwareData that holds the expiry date
        const expiryDate = new Date(software.expiryDate);

        // Check if the expiry date is within the next 15 days
        return expiryDate > currentDate && expiryDate <= fifteenDaysFromNow;
      }).length;
    }
  }

  getIconPath(name: string): string {
    // Customize this logic based on your requirements
    if (name === 'Figma') {
      return '../../../assets/icons/dashboard/image 156.png';
    } else if (name === 'Microsofts Windows NT operating system software license') {
      return '../../../assets/icons/dashboard/Microsoft.svg';
    } else if (name === 'Visual Studio Code') {
      return '../../../assets/icons/dashboard/image 154.png';
    } 
    

    else {
      // Default path or handle other cases
      return '../../../assets/icons/dashboard/Ellipse.svg';
    }
  }
}
