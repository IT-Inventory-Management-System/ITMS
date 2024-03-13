import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  @Input() device: any;
  @Input() isArchived: any;
  DeviceData: any;
  DeviceInfo: any;
  DeviceLog: any;
  CommentDetails: any;
  @Input() AllDevices: any;
  isselectedDevice: boolean = false;
  selectedDeviceId: string | null = null;
  locationId: string = '';

  // Static variable to store the selected device ID
  private static selectedDeviceId: string | null = null;

  constructor(private deviceService: DataService, private el: ElementRef, private renderer: Renderer2, private route: ActivatedRoute) { }

  getDeviceLocation() {
    this.deviceService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            this.deviceService.locationId = this.locationId;
            this.getDeviceLogs(this.deviceService.DeviceDetails.cygid);
            //this.showDevices();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }

  ngOnInit() {
    //this.getDeviceLocation();
    this.selectFirstDevice();

  }

  async showDevices() {
  

    // Select the first device
    this.selectFirstDevice();
  }

  onDeviceClick(cygid: any): void {
    DevicesListComponent.selectedDeviceId = cygid; // Update the static variable
    this.selectedDeviceId = cygid;
    this.isselectedDevice = true;

    this.deviceService.getDevicesInfo(cygid).subscribe(
      (data) => {
        this.DeviceInfo = data;
        this.deviceService.DeviceDetails = this.DeviceInfo;
        this.getDeviceLocation();
        this.deviceService.triggerButtonClick();
        this.resetStyles();
        this.updateStyles();
      },
      (error) => {
        console.error('Error fetching device info:', error);
      }
    );
  }

  updateStyles() {
    const outerCard = this.el.nativeElement.querySelector('.devices-list-container-items');
    if (this.device.cygid === this.selectedDeviceId) {
      this.renderer.setStyle(outerCard, 'background-color', '#E3F3FC');
      this.renderer.setStyle(outerCard, 'color', 'white');
    }
  }

  resetStyles() {
    if (this.isselectedDevice) {
      // Reset styles for all cards
      const allCards = document.querySelectorAll('.devices-list-container-items');
      allCards.forEach(card => {
        this.renderer.removeStyle(card, 'background-color');
        this.renderer.removeStyle(card, 'color');
      });
    }
  }
  
  getDeviceLogs(Cygid: any): void {

    const inputData = {
      locationId: this.locationId,
      cygid: Cygid
    }

    this.deviceService.getUserInfo(inputData).subscribe(
      (logs) => {
        for (var i = 0; i < logs.length; i++) {
          logs[i].assignedDate = formatDate(logs[i].assignedDate, 'dd-MM-yyyy', 'en-US');
          logs[i].recievedDate = logs[i].recievedDate != null ? formatDate(logs[i].recievedDate, 'dd-MM-yyyy', 'en-US') : null;
        }
        this.deviceService.DeviceLog = logs;
        //console.log('Device Logs:', logs);
        //console.log(this.deviceService.DeviceLog.id);
      },
      (error) => {
        console.error('Error fetching device logs:', error);
      }
    );
  }

  // Method to select the first device
  private selectFirstDevice(): void {
    if (this.AllDevices && this.AllDevices.length > 0) {

      this.route.queryParams.subscribe(params => {
        const cygId = params['cygId'];

        if (cygId) {
          const firstDeviceId = cygId;
          this.onDeviceClick(firstDeviceId);
        } else {
          const firstDeviceId = this.AllDevices[0].cygid;
          this.onDeviceClick(firstDeviceId);
        }
      });

      
    }
  }
}
