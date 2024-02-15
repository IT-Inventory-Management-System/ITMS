import { Component, OnInit } from '@angular/core';
import { SoftwareService } from '../shared/services/Software.service';
import { ColDef } from 'ag-grid-community';
import * as XLSX from 'xlsx';
import { LocationService } from '../shared/services/location.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';


@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  selectedView: string = 'card';
  softwaresData: any[];
  version: string[];
  rowData: any[] = [];
  selectedLocation: any = '';
  parameters: any = null;

  filteredSoftware: any[]
  filterValues: string = '';


  //onCardClicked(eventData: any): void {
  //  // Handle the emitted event data here
  //  console.log('Card clicked:', eventData);
  //  // You can also perform any other actions based on the event data
  //}

  applySoftwareFilter(event: Event) {
    this.filterValues = (event.target as HTMLInputElement).value;
    this.filteredSoftware = this.softwaresData.filter((software) =>
      software.name.toLowerCase().includes(this.filterValues.toLowerCase())

    );
  }


  constructor(private softwareService: SoftwareService, private LocationService: LocationService, private selectedCountryService: SelectedCountryService) { } // Injecting SoftwareService



  onCardClicked(eventData: any): void {
    // Assuming eventData contains the parameters needed for GetSingleSelected
    const parameters = {
      name: eventData.name,
      version: eventData.version,
      location: eventData.location,
      type: eventData.type
    };

    // Call the service method
    this.softwareService.GetSingleSelected(parameters).subscribe(
      (result: any | null) => {
        if (result) {
          // Handle the result here
          console.log('Single software selected:', result);
        } else {
          // Handle case when no software is found
          console.log('No software found for parameters:', parameters);
        }
      },
      error => {
        console.error('Error fetching single software:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getSoftwaresData();
    //this.filteredSoftware = this.softwaresData;
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      console.log(this.selectedLocation);


    });

  }

  getSoftwaresData(): void {
    this.softwareService.GetSoftware().subscribe(
      data => {
        console.log(data)
        this.softwaresData = data;
        this.filteredSoftware = this.softwaresData;
        console.log("filter", this.filteredSoftware);





      },
      error => {
        console.error('Error fetching software data', error);
      }
    );
  }


  colDefs: ColDef[] = [
    {
      field: "SNo",
      resizable: false,
      suppressMovable: true,
      width: 65
    },
    { field: "Software Name",  resizable: false,  width: 150,  suppressMovable: true },
    {field: "Version",  width: 100,  resizable: false, suppressMovable: true },
    { field: "# Total", width: 90, resizable: false, suppressMovable: true, },
    { field: "# Assigned", width: 109, resizable: false, suppressMovable: true, },
    { field: "# Inventory", width: 142, resizable: false, suppressMovable: true, },
    { field: "Date of Purchase", width: 170, resizable: false, suppressMovable: true, },
    { field: "Expiry Date", width: 150, resizable: false, suppressMovable: true, },
    { field: "# Stock Status", width: 125, resizable: false, suppressMovable: true, },
    { field: "Assigned To", width: 128, resizable: false, suppressMovable: true, },
    { field: "Assigned Date", width: 129, resizable: false, suppressMovable: true, },
    { field: "Software Status", width: 135, resizable: false, suppressMovable: true, },
     { field: "Stock Status", pinned: 'right', cellStyle: { 'border': 'none' }, width: 122, resizable: false, suppressMovable: true, }

  ];
  filename = 'ExcelSheet.xlsx';
  exporttoexcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.filename);
  }
}

