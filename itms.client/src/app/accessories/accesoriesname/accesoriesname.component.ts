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
    this.cardClicked.emit({
      CYGID: this.accessories.cygid,
      accessoryId: this.accessories.accessoryId
    });
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
      // Add more cases for other categories as needed
      default:
        // Default icon if category doesn't match any specific case
        iconFileName = 'Ellipse.svg';
        break;
    }


    // Return the full path to the icon file
    return `../../../assets/icons/Accessories/${iconFileName}`;
  }


}
