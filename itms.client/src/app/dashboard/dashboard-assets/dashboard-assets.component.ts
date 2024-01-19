import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-assets',
  templateUrl: './dashboard-assets.component.html',
  styleUrls: ['./dashboard-assets.component.css']
})
export class DashboardAssetsComponent {
  @Input() primaryData: any;


  getIconPath(name: string): string {
    // Customize this logic based on your requirements
    if (name === 'Monitor') {
      return '../../../assets/icons/dashboard/desktop-solid 1.svg';
    } else if (name === 'Mac') {
      return '../../../assets/icons/dashboard/apple.svg';
    } else if (name === 'windows') {
      return '../../../assets/icons/dashboard/windows.svg';
    } else if (name === 'Mobile Devices') {
      return '../../../assets/icons/dashboard/DeviceMobile.svg';
    } else {
      // Default path or handle other cases
      return '../../../assets/icons/dashboard/windows.svg';
    }
  }
}
