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
 
  constructor(private deviceService: DataService) {

  }


  ngOnInit() {

    console.log('hi' + this.device.id);
    console.log(this.device.length);
    this.showDevices();
    this.selectedDevice = this.DeviceData.length > 0 ? this.DeviceData[0] : null;
 
    // if(this.device.length>1)


  }
  async showDevices() {
    this.AllDevices = await lastValueFrom(this.deviceService.getDevices())
    this.onDeviceClick(this.AllDevices[0].cygid)
  }

  onDeviceClick(cygid: any): void {
    console.log('Device Object:', this.device.cygid);

    // Call the first API to get device information
    this.deviceService.getDevicesInfo(cygid).subscribe(
      (data) => {
        this.DeviceInfo = data;
        console.log(data);
        this.deviceService.DeviceDetails = this.DeviceInfo;

        // Call the second API to get device logs
        this.getDeviceLogs(this.deviceService.DeviceDetails.cygid);
        this.getComments();
      },
      (error) => {
        // Handle errors for the first API here
        console.error('Error fetching device info:', error);
      }
    );
  }

  getDeviceLogs(Cygid: any): void {
    // Call the second API to get device logs
    this.deviceService.getUserInfo(Cygid).subscribe(
      (logs) => {
        // Handle the API response for device logs here
        this.deviceService.DeviceLog = logs;
        //console.log('Device Logs:', logs);
      },
      (error) => {
        // Handle errors for the second API here
        console.error('Error fetching device logs:', error);
      }
    );


  }



  getComments() {
    const observables = this.deviceService.DeviceLog.map((d: { id: any; }) => {
      const deviceId = d.id;
      console.log(deviceId);

      return this.deviceService.getCommentById(deviceId).pipe(
        map(data => {
          this.deviceService.CommentDetails = data;
          console.log(data);
          return data;  // Returning the data from the map operator
        })
      );
    });

    forkJoin(observables).subscribe();
  }
  /*  @ViewChild('firstButton') firstButton: ElementRef;*/


  ngAfterViewInit() {
    // Trigger click event on the first button when the view is initialized
    //console.log('hii' + this.firstButton.nativeElement);
    //  this.firstButton.nativeElement.click();



  }

}
