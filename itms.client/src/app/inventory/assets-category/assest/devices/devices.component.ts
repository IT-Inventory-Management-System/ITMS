import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() filterData: any;
  archivedCyg: any = null;

  constructor(private dataService: DataService, private selectedCountryService: SelectedCountryService) {
  }

  getDeviceLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
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

    this.dataService.deviceListChanged$.subscribe((cygid: string | null) => {
      this.loading = true;
      if (cygid !== null) {
        this.archivedCyg = cygid;
        this.getDeviceLocation();
      } else {
        this.getDeviceLocation();
      }
    });
  }

  ngOnDestroy() {
    this.archivedCyg = null;
    //console.log("pppp", this.archivedCyg)
  }


  showDevices() {

    if (this.filterData == null) {
      this.dataService.getDevices(this.locationId).subscribe(
        (data) => {
          this.DeviceData = data;
          this.loading = false;
        });
    }
    else {
      var filter = {
        deviceStatus: this.filterData.deviceStatus,
        operatingSystem: this.filterData.operatingSystem,
        uniqueProcessor: this.filterData.uniqueProcessor,
        fromDate: this.filterData.fromDate,
        toDate: this.filterData.toDate,
        locationId: this.locationId
      }

      this.dataService.getFilteredDevices(filter).subscribe(
        (data) => {
          this.DeviceData = data;
          //console.log("FILTERED DATA : ", this.DeviceData);
          this.loading = false;
        });
    }
    
  }

  showArchivedDevices() {
    this.dataService.getArchivedDevices(this.locationId)
      .subscribe(data => {
        this.DeviceData = data;
        //console.log(data);
      });
  }


}
