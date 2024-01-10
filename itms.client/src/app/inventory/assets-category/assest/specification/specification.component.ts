import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
 

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})

export class SpecificationComponent {
  @Input() isArchived: any;

  constructor(private dataService: DataService) { }

  
  get deviceDetails() {

    console.log(this.isArchived);
    return this.dataService.DeviceDetails;
  }

  //countModel() {
  //  const deviceModelName = this.dataService.DeviceDetails?.deviceModel?.deviceName;

  //  if (deviceModelName) {
  //    this.dataService.getModelCount(deviceModelName).subscribe(
  //      count => {
  //        console.log('Count retrieved:', count);
  //        this.modelCount = count;
  //        // this.cdr.detectChanges(); // Remove this line
  //      },
  //      error => {
  //        console.error('Error retrieving count:', error);
  //      }
  //    );
  //  }
  //}

}
