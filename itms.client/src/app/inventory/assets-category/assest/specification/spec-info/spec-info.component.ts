import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-spec-info',
  templateUrl: './spec-info.component.html',
  styleUrls: ['./spec-info.component.css'],
  changeDetection: ChangeDetectionStrategy.Default, // Ensure this line is present
})
export class SpecInfoComponent implements OnInit {
  @Input() key: string;
  

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ngOnInit triggered');

    
  }

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  }

  getFormattedPurchasedDate(): string {
    return this.deviceDetails?.formattedPurchasedDate ?? '';
  }
  
}
