import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assign-laptop',
  templateUrl: './assign-laptop.component.html',
  styleUrls: ['./assign-laptop.component.css']
})
export class AssignLaptopComponent {
  @Input() LaptopOptions: any[] = [];
  @Output() LaptopOptionSelected: EventEmitter<any> = new EventEmitter();
  SelectedLaptopVersion: any;
  LaptopSearchBoxOptionSelected(event: any): void {
    //console.log('LaptopSearchBoxOptionSelected', event);
    this.SelectedLaptopVersion = event;
    this.LaptopOptionSelected.emit(event); 
  }
}
