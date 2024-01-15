import { Component, Input, OnInit, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  @Input() device: any;
  DeviceInfo: any;
  DeviceLog: any;
  isSelected: boolean = false;

  // Use ViewChildren to query all buttons
  @ViewChildren('deviceButton') deviceButtons: QueryList<ElementRef>;

  constructor(private deviceService: DataService, private renderer: Renderer2) { }

  ngOnInit() {
    // Fetch the data when the component is initialized
    this.onDeviceClick();
  }

  onDeviceClick(): void {
    console.log('Device Object:', this.device.cygid);

    // Call the first API to get device information
    this.deviceService.getDevicesInfo(this.device.cygid).subscribe(
      (data) => {
        this.DeviceInfo = data;
        console.log(data);
        this.deviceService.DeviceDetails = this.DeviceInfo;

        // Call the second API to get device logs
        this.getDeviceLogs();

        // Set autofocus on the first button after data is fetched
        //setTimeout(() => {
        //  this.setAutofocus();
        //});
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
        this.isSelected = true; // Set the flag to indicate that the button is selected
      },
      (error) => {
        // Handle errors for the second API here
        console.error('Error fetching device logs:', error);
      }
    );
  }

  // Function to set autofocus dynamically on the first button
  //setAutofocus() {
  //  const firstButton = this.deviceButtons.first;
  //  if (firstButton) {
  //    this.renderer.setAttribute(firstButton.nativeElement, 'autofocus', 'true');
  //    console.log('First ElementRef:', firstButton);
  //  }
  //}
}
