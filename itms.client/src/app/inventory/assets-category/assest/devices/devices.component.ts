import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { FilterSearchListPipe } from '../../../../filter-search-list.pipe';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit{
  @Input() isArchived: any;
  DeviceData: any[] = [];
  Cygid = this.DeviceData;
  showArchiveOnly: boolean = false;
  ArchivedData: any[] = [];
  searchdevice: any; 
  locationId: string='';
  constructor(private dataService: DataService) {
  }

  getDeviceLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
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


  ngOnInit(): void {
    this.getDeviceLocation();
   
  }


  showDevices() {
    this.dataService.getDevices(this.locationId).subscribe(
      (data) => {
        this.DeviceData = data;
        console.log(this.DeviceData);
      });
  }

  showArchivedDevices() {
    this.dataService.getArchivedDevices(this.locationId)
      .subscribe(data => {
        this.DeviceData = data;
        console.log(data);
      });
  }




}
