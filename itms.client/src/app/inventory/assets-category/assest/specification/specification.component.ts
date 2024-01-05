import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
 

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent  {
 
constructor(private dataService: DataService) {}

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  } 
}
