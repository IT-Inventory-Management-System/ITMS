import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-spec-info',
  templateUrl: './spec-info.component.html',
  styleUrls: ['./spec-info.component.css']
})
export class SpecInfoComponent implements OnInit {
  @Input() key: string;
  modelCount: number;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ngOnInit triggered');
    // Assuming you have a property in your dataService to store the device model name
    const deviceModelName = this.dataService.DeviceDetails?.deviceModel?.deviceName;

   
    
  }

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  }

  getFormattedPurchasedDate(): string {
    return this.deviceDetails?.formattedPurchasedDate ?? '';
  }
}
