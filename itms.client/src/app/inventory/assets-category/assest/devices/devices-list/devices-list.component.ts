import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  AllDevices: any;
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
            //alert(this.locationId);
            this.showDevices();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }

  ngOnInit() {
    this.getDeviceLocation();
  }

  async showDevices() {
    if (this.isArchived == false) {
      this.AllDevices = await lastValueFrom(this.deviceService.getDevices(this.locationId));
    } else {
      this.AllDevices = await lastValueFrom(this.deviceService.getArchivedDevices(this.locationId));
    }

    // Select the first device
    this.selectFirstDevice();
  }

  onDeviceClick(cygid: any): void {
    this.resetStyles();
    DevicesListComponent.selectedDeviceId = cygid; // Update the static variable
    this.selectedDeviceId = cygid;
    this.isselectedDevice = true;
    this.updateStyles();

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

  updateStyles() {
    // Apply styles to the clicked card
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
    this.deviceService.getUserInfo(Cygid).subscribe(
      (logs) => {
        this.deviceService.DeviceLog = logs;
        console.log('Device Logs:', logs);
        console.log(this.deviceService.DeviceLog.id);
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
