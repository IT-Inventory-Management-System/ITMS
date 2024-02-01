import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { FilterSearchListPipe } from '../../../../filter-search-list.pipe';
import { SelectedCountryService } from '../../../../shared/services/selected-country.service';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit{
  @Input() isArchived: any;
  @Input() selectedItem: any;
  DeviceData: any[] = [];
  Cygid = this.DeviceData;
  showArchiveOnly: boolean = false;
  ArchivedData: any[] = [];
  searchdevice: any; 
  locationId: string = '';
  loading: boolean = true;
  constructor(private dataService: DataService, private selectedCountryService: SelectedCountryService) {
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
    this.loading = true;
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getDeviceLocation();
    });

   
   
  }


  showDevices() {
    this.dataService.getDevices(this.locationId).subscribe(
      (data) => {
        this.DeviceData = data;
       
        //if (this.selectedItem) {
        //  this.DeviceData = this.DeviceData.filter(device => device.operatingSystem[0].osname === this.selectedItem);
        //}
        //console.log( this.DeviceData)
        this.loading = false; 
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
