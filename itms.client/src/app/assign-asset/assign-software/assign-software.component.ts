import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assign-software',
  templateUrl: './assign-software.component.html',
  styleUrls: ['./assign-software.component.css']
})
export class AssignSoftwareComponent {
  @Input() SoftwareOptions: any[] = [];
  @Output() SoftwareOptionSelected: EventEmitter<any> = new EventEmitter();
  @Input() SoftwareVersionOptions: any[] = [];
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();

  SelectedSoftware: any;
  SelectedSoftwareVersion: any;
  SoftwareSearchBoxOptionSelected(event: any): void {
    //console.log('SoftwareSearchBoxOptionSelected', event);
    this.SelectedSoftware = event;
    this.SoftwareOptionSelected.emit(event); // Propagate the event to parent
  }
  SoftwareSearchBoxVersionOptionSelected(event: any): void {
    //console.log('SoftwareSearchBoxVersionOptionSelected', event);
    this.SelectedSoftwareVersion = event;
    this.SoftwareVersionOptionSelected.emit(event); // Propagate the event to parent
  }

}
