import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { forkJoin, lastValueFrom, map } from 'rxjs';


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  @Input() device: any;
  DeviceData: any;
  DeviceInfo: any;
  DeviceLog: any;
  CommentDetails: any;
  AllDevices: any;
  selectedDevice: any;
 
  constructor(private deviceService: DataService) { } 

  ngOnInit() {

    console.log('hi' + this.device.id);
    console.log(this.device.length);
    this.showDevices();
    this.selectedDevice = this.DeviceData.length > 0 ? this.DeviceData[0] : null;
  }

  async showDevices() {
    this.AllDevices = await lastValueFrom(this.deviceService.getDevices())
    this.onDeviceClick(this.AllDevices[0].cygid)
  }

  onDeviceClick(cygid: any): void {
    console.log('Device Object:', this.device.cygid);
    this.deviceService.getDevicesInfo(cygid).subscribe(
      (data) => {
        this.DeviceInfo = data;
        console.log(data);
        this.deviceService.DeviceDetails = this.DeviceInfo;
        this.getDeviceLogs(this.deviceService.DeviceDetails.cygid);
      },
      (error) => {
        
        console.error('Error fetching device info:', error);
      }
    );
  }

  getDeviceLogs(Cygid: any): void {
   
    this.deviceService.getUserInfo(Cygid).subscribe(
      (logs) => {
       
        this.deviceService.DeviceLog = logs;
        console.log('Device Logs:', logs);
      },
      (error) => {
       
        console.error('Error fetching device logs:', error);
      }
    );
  }
}
