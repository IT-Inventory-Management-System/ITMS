import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assign-accessories',
  templateUrl: './assign-accessories.component.html',
  styleUrls: ['./assign-accessories.component.css']
})
export class AssignAccessoriesComponent {
  @Input() AccessoryOptions: any[] = [];
  @Output() AccessoryOptionSelected: EventEmitter<any> = new EventEmitter();
  SelectedAccessories: any;
  AccessorySearchBoxOptionSelected(event: any): void {
    //console.log('LaptopSearchBoxOptionSelected', event);
    this.SelectedAccessories = event;
    this.AccessoryOptionSelected.emit(event);
  }
}
