import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
 

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent  {
  @Input() selectedDevice: any[];

  selectDevice(deviceClicked: any[]) {
    this.selectedDevice;
  }
  @Output()
 
 
}
