import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-software-component',
  templateUrl: './software-component.component.html',
  styleUrls: ['./software-component.component.css']
})
export class SoftwareComponentComponent {
  @Input() softwareData: any;


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
