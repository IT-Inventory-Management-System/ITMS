
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
  DeviceLog: any;

  constructor(private deviceService: DataService) {
    this.DeviceData = [];
    this.DeviceInfo = [];
    this.DeviceLog = [];
  }


  onDeviceClick(): void {
    console.log('Device Object:', this.device.cygid);

    // Call the first API to get device information
    this.deviceService.getDevicesInfo(this.device.cygid).subscribe(
      (data) => {
        this.DeviceInfo = data;
        this.deviceService.DeviceDetails = this.DeviceInfo;
        // Handle the API response here
        console.log('Device Info:', this.DeviceInfo);

        // Call the second API to get device logs
        this.getDeviceLogs();
      },
      (error) => {
        // Handle errors for the first API here
        console.error('Error fetching device info:', error);
      }
    );
  }

  getDeviceLogs(): void {
    // Call the second API to get device logs
    this.deviceService.getUserInfo(this.device.cygid).subscribe(
      (logs) => {
        // Handle the API response for device logs here
        this.deviceService.DeviceLog = logs;
        console.log('Device Logs:', logs);
      },
      (error) => {
        // Handle errors for the second API here
        console.error('Error fetching device logs:', error);
      }
    );
  }

  @ViewChild('firstButton') firstButton: ElementRef;

  ngAfterViewInit() {
    // Trigger click event on the first button when the view is initialized
    this.firstButton.nativeElement.click();
  }



}
