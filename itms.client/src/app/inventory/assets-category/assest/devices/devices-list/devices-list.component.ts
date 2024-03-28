import { Component, Input, OnInit} from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent {
  @Input() device: any;
  @Input() isArchived: any;
  @Input() index: number;
  DeviceData: any;
  DeviceInfo: any;
  DeviceLog: any;
  CommentDetails: any;
  @Input() AllDevices: any;
  isselectedDevice: boolean = false;
  selectedDeviceId: string | null = null;
  locationId: string = '';
  private static selectedDeviceId: string | null = null;
  @Input() archivedCyg: any;

  constructor(private deviceService: DataService, private route: ActivatedRoute) { }

  getDeviceLocation() {
    this.deviceService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            this.deviceService.locationId = this.locationId;
            this.getDeviceLogs(this.deviceService.DeviceDetails.cygid);
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }

  ngOnChanges() {
    if (this.index == 0) {
      this.selectFirstDevice();
    }
  }

  ngOnDestroy() {
    this.archivedCyg = null;
  }

  async showDevices() {
    this.selectFirstDevice()
  }

  onDeviceClick(cygid: any, flag: boolean): void {
    DevicesListComponent.selectedDeviceId = cygid;
    this.selectedDeviceId = cygid;
    this.isselectedDevice = true;

    this.deviceService.getDevicesInfo(cygid).subscribe(
      (data) => {
        this.DeviceInfo = data;
        this.deviceService.DeviceDetails = this.DeviceInfo;
        //console.log(this.deviceService.DeviceDetails);
        this.getDeviceLocation();
        this.deviceService.triggerButtonClick();
        if (flag == false) {
          this.resetStyles();
        }
        this.updateStyles();
      },
      (error) => {
        console.error('Error fetching device info:', error);
      }
    );
  }

  updateStyles() {
    const outerCards = document.querySelectorAll('.devices-list-container-items');
    outerCards.forEach((outerCard: any) => {
      const cardCygid = outerCard.getAttribute('data-cygid');
      if (cardCygid === this.selectedDeviceId) {
        outerCard.style.backgroundColor = '#E3F3FC';
        outerCard.style.border = '1px solid #28519E';
        outerCard.style.color = 'white';
      } else {
        outerCard.style.backgroundColor = '';
        outerCard.style.border = '';
        outerCard.style.color = '';
      }
    });
  }



  resetStyles() {
    if (this.isselectedDevice) {
      const allCards = document.querySelectorAll('.devices-list-container-items');
      allCards.forEach((card: any) => {
        try {
          card.style.removeProperty('background-color');
          card.style.removeProperty('border');
          card.style.removeProperty('color');
        } catch (error) {
          // Handle the error here
          console.error('An error occurred while removing styles:', error);
        }
      });
    }
  }

  
  getDeviceLogs(Cygid: any): void {
    const inputData = {
      locationId: this.locationId,
      cygid: Cygid
    };

    this.deviceService.getUserInfo(inputData).subscribe(
      (logs) => {
        if (Array.isArray(logs)) { // Check if logs is an array
          // Process logs data
          for (let i = 0; i < logs.length; i++) {
            logs[i].assignedDate = formatDate(logs[i].assignedDate, 'dd-MM-yyyy', 'en-US');
            logs[i].recievedDate = logs[i].recievedDate != null ? formatDate(logs[i].recievedDate, 'dd-MM-yyyy', 'en-US') : null;
          }
          this.deviceService.DeviceLog = logs; // Assign logs to DeviceLog
        } else {
          console.error('Error: Expected an array of logs, but received:', logs);
        }
      },
      (error) => {
        console.error('Error fetching device logs:', error);
      }
    );
  }




  private selectFirstDevice(): void {
    if (this.AllDevices && this.AllDevices.length > 0) {

      this.route.queryParams.subscribe(params => {
        const cygId = params['cygId'];

        if (cygId) {
          const firstDeviceId = cygId;
          this.onDeviceClick(firstDeviceId, true);
        } else if (this.archivedCyg) {
          const firstDeviceId = this.archivedCyg;
          this.onDeviceClick(firstDeviceId, true);
        }
        else {
          const firstDeviceId = this.AllDevices[0].cygid;
          this.onDeviceClick(firstDeviceId, true);
        }
      });

      
    }
  }
}
