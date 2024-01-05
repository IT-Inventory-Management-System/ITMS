import { Component, Input } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-spec-info',
  templateUrl: './spec-info.component.html',
  styleUrls: ['./spec-info.component.css']
})
export class SpecInfoComponent {
  

  @Input() key: string;

 
constructor(private dataService: DataService) { }

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  } 

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
 


}
