import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accesories',
  templateUrl: './accesories.component.html',
  styleUrls: ['./accesories.component.css']
})
export class AccesoriesComponent {
  @Input() accessoriesData: any;
  @Input() selectedLocation: any;

  getIconPath(name: string): string {
    const lowerCaseName = name.toLowerCase();

    // Customize this logic based on your requirements
    if (lowerCaseName === 'keyboard') {
      return '../../../assets/icons/dashboard/keyboard.svg';
    } else if (lowerCaseName === 'bag') {
      return '../../../assets/icons/dashboard/bag-blue.svg';
    } else if (lowerCaseName === 'combo') {
      return '../../../assets/icons/dashboard/combo.svg';
    } else if (lowerCaseName === 'mouse') {
      return '../../../assets/icons/dashboard/Mouse.svg';
    } else if (lowerCaseName === "connector(texas instruments)") {
        return '../../../assets/icons/dashboard/connector.svg'
    } else if (lowerCaseName === "monitor") {
      return '../../../assets/icons/dashboard/desktop-solid 1.svg'
    } else if (lowerCaseName === 'mobile devices') {
      return '../../../assets/icons/dashboard/DeviceMobile.svg';
    } else if (lowerCaseName === 'apple vga connector') {
      return '../../../assets/icons/dashboard/Icons=VGA.svg';
    } else if (lowerCaseName === 'apple thunderbolt(lan)') {
      return '../../../assets/icons/dashboard/Icons=LAN Connector.svg';
    } else if (lowerCaseName === 'external hard drive connectors') {
      return '../../../assets/icons/dashboard/connector.svg';
    } else if (lowerCaseName === 'iphone usb-a to lightning') {
      return '../../../assets/icons/dashboard/HDMI.svg';
    } else if (lowerCaseName === 'android cables') {
      return '../../../assets/icons/dashboard/HDMI.svg';
    } else if (lowerCaseName === 'server') {
      return '../../../assets/icons/dashboard/RAM.svg';
    } else if (lowerCaseName === 'hdmi cables') {
      return '../../../assets/icons/dashboard/HDMI.svg';
    } else if (lowerCaseName === 'mini-display hdmi connector') {
      return '../../../assets/icons/dashboard/Icons=Mini Display HDMI Connector.svg';
    }

    else {
      // Default path or handle other cases
      return '../../../assets/icons/dashboard/Ellipse.svg';
    }
  }

}
