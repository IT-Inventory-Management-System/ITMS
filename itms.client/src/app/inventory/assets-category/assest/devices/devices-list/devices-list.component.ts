import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { lastValueFrom } from 'rxjs';

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

  // Static variable to store the selected device ID
  private static selectedDeviceId: string | null = null;


  constructor(private deviceService: DataService, private el: ElementRef, private renderer: Renderer2) { }


  ngOnInit() {
    this.showDevices();
    this.selectedDeviceId = DevicesListComponent.selectedDeviceId || null;

    if (this.selectedDeviceId === this.device.cygid) {
      this.isselectedDevice = true;
      this.updateStyles();
    }
  }

  async showDevices() {


    if (this.isArchived == false) {
      this.AllDevices = await lastValueFrom(this.deviceService.getDevices())
      localStorage.setItem('selectedDevice', this.AllDevices[0].cygid);
      this.onDeviceClick(this.AllDevices[0].cygid)
    }
    else {
      this.AllDevices = await lastValueFrom(this.deviceService.getArchivedDevices())
      localStorage.setItem('selectedDevice', this.AllDevices[0].cygid);
      this.onDeviceClick(this.AllDevices[0].cygid)
    }


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
}
