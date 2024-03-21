import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accesoriesname',
  templateUrl: './accesoriesname.component.html',
  styleUrls: ['./accesoriesname.component.css']
})
export class AccesoriesnameComponent {

  @Input() accessories: any
  @Input() isSelected: boolean = false;


  @Output() cardClicked: EventEmitter<any> = new EventEmitter<any>();
  //onClick(): void {
  //  this.cardClicked.emit();
  //}

  onClick(): void {
    if (!this.isSelected) {
      this.cardClicked.emit({
        CYGID: this.accessories.cygid,
        accessoryId: this.accessories.accessoryId
      });
    }
  }

  getAccessoryIconPath(category: string): string {
    let iconFileName = '';

    // Determine the icon file name based on the category
    switch (category.toLowerCase()) {
      case 'mouse':
        iconFileName = 'Mouse.svg';
        break;
      case 'keyboard':
        iconFileName = 'keyboard.svg';
        break;

      case 'external hard drive connectors':
        iconFileName = 'external-hard-drive-connectors-blue.svg';
        break;

      case 'apple vga connector':
        iconFileName = 'external-hard-drive-connectors-blue.svg';
        break;

      case 'hdmi cables':
        iconFileName = 'hdmi-cables-blue.svg';
        break;
      case 'connector(texas instruments)':
        iconFileName = 'connectortexas-instruments-blue.svg';
        break;

      case 'server':
        iconFileName = 'server-blue.svg';
        break;

      case 'apple thunderbolt(lan)':
        iconFileName = 'apple-thunderboltlan-blue.svg';
        break;

      case 'mini-display hdmi connector':
        iconFileName = 'mini-display-hdmi-connector-blue.svg';
        break;

      case 'monitor':
        iconFileName = 'Monitor.svg';
        break;

      case 'bag':
        iconFileName = 'bag-blue.svg';
        break;

      case 'mobile devices':
        iconFileName = 'DeviceMobile.svg';
        break;

      case 'combo':
        iconFileName = 'combo-blue.svg';
        break;

      default:
        iconFileName = 'Ellipse.svg';
        break;
    }


    // Return the full path to the icon file
    return `../../../assets/icons/Accessories/${iconFileName}`;
  }


}
