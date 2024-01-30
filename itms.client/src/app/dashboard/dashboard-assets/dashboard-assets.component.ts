import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-assets',
  templateUrl: './dashboard-assets.component.html',
  styleUrls: ['./dashboard-assets.component.css']
})
export class DashboardAssetsComponent {
  @Input() primaryData: any;
  @Input() selectedLocation: any;

  getIconPath(name: string): string {
    const lowerCaseName = name.toLowerCase();

    // Customize this logic based on your requirements
    if (lowerCaseName === 'monitor') {
      return '../../../assets/icons/dashboard/desktop-solid 1.svg';
    } else if (lowerCaseName === 'mac') {
      return '../../../assets/icons/dashboard/apple.svg';
    } else if (lowerCaseName === 'windows') {
      return '../../../assets/icons/dashboard/windows.svg';
    } else if (lowerCaseName === 'mobile devices') {
      return '../../../assets/icons/dashboard/DeviceMobile.svg';
    } else {
      // Default path or handle other cases
      return '../../../assets/icons/dashboard/Ellipse.svg';
    }
  }
}
