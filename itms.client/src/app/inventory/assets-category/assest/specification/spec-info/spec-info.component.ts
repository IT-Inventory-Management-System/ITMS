import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-spec-info',
  templateUrl: './spec-info.component.html',
  styleUrls: ['./spec-info.component.css']
})
export class SpecInfoComponent  {
  @Input() key: string;
  modelCount: number;
  @Output() modelClicked = new EventEmitter<string>();

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

 
    
    // Assuming you have a property in your dataService to store the device model name
    /*const deviceModelName = this.dataService.DeviceDetails?.deviceModel?.deviceName;*/

  handleClick(modelno : string) {
    this.modelClicked.emit(modelno);
    console.log(modelno);
  }
    
  

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  }

  getFormattedPurchasedDate(): string {
    return this.deviceDetails?.formattedPurchasedDate ?? '';
  }
}
