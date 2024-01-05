import { Component, Input, OnInit, Output } from '@angular/core';
 

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})

 
constructor(private dataService: DataService) {}

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  } 

}
