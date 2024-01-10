
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent {


  @Input() device: any;
  DeviceData: any;
  DeviceInfo: any;

  constructor(private deviceService: DataService) {
    this.DeviceData = [];
    this.DeviceInfo = [];
  }


  onDeviceClick(): void {
    console.log('Device Object:', this.device.cygid);
    this.deviceService.getDevicesInfo(this.device.cygid).subscribe(

      (data) => {
        this.DeviceInfo = data
        this.deviceService.DeviceDetails = this.DeviceInfo;
        // Handle the API response here
        console.log(this.DeviceInfo);
      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
  }
  @ViewChild('firstButton') firstButton: ElementRef;

  ngAfterViewInit() {
    // Trigger click event on the first button when the view is initialized
    this.firstButton.nativeElement.click();
  }



}
