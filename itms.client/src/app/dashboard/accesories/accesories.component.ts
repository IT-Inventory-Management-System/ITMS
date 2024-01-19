import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accesories',
  templateUrl: './accesories.component.html',
  styleUrls: ['./accesories.component.css']
})
export class AccesoriesComponent {
  @Input() accessoriesData: any;

  getIconPath(name: string): string {
    // Customize this logic based on your requirements
    if (name === 'Keyboard') {
      return '../../../assets/icons/dashboard/keyboard.svg';
    } else if (name === 'Bag') {
      return '../../../assets/icons/dashboard/bag-blue.svg';
    } else if (name === 'Combo') {
      return '../../../assets/icons/dashboard/Ellipse.svg';
    } else if (name === 'Mouse') {
      return '../../../assets/icons/dashboard/Mouse.svg';
    } else if (name === "Connector(Texas Instruments)") {
        return '../../../assets/icons/dashboard/Ellipse.svg'
    } else if (name === "Monitor") {
      return '../../../assets/icons/dashboard/desktop-solid 1.svg'
    }

    else {
      // Default path or handle other cases
      return '../../../assets/icons/dashboard/windows.svg';
    }
  }

}
