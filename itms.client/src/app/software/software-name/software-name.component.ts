import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-software-name',
  templateUrl: './software-name.component.html',
  styleUrls: ['./software-name.component.css']
})
export class SoftwareNameComponent {

  @Input() softwareData: any;
  @Input() selectedLocation: any;
  @Input() isArchived: any;

  @Output() cardClicked: EventEmitter<any> = new EventEmitter<any>();
  onClick(version: any): void {
    this.cardClicked.emit({
      name: this.softwareData.name,
      version:version.version,
      type: this.softwareData.type,
      location: this.selectedLocation
    });
  }
}
