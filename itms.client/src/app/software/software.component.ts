import { Component, OnInit } from '@angular/core';
import { SoftwareService } from '../shared/services/Software.service';
import { ColDef } from 'ag-grid-community';
import * as XLSX from 'xlsx';
import { LocationService } from '../shared/services/location.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  allSoftwareData: any[];
  selectedView: string = 'card';
  softwaresData: any[];
  softwarestableData: any[];
  version: string[];
  rowData: any[] = [];
  selectedLocation: any = '';
  parameters: any = null;
  singlesoftware: any = null;
  softwarehistory: any = null;
  archive: any;
  isArchived: boolean = false;

  filteredSoftware: any[] = [];
  filterValues: string = '';


  //onCardClicked(eventData: any): void {
  //  // Handle the emitted event data here
  //  console.log('Card clicked:', eventData);
  //  // You can also perform any other actions based on the event data
  //}

  //applySoftwareFilter(event: Event) {
  //  this.filterValues = (event.target as HTMLInputElement).value;
  //  this.filteredSoftware = this.softwaresData.filter((software) =>
  //    software.name.toLowerCase().includes(this.filterValues.toLowerCase())

  //  );
  //}
  

  applySoftwareFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSoftware = this.softwaresData.filter((software: any) =>
      software.name.toLowerCase().includes(filterValue)
    );
  }

 


  constructor(private softwareService: SoftwareService, private LocationService: LocationService, private selectedCountryService: SelectedCountryService) { }

  onApplyClicked(eventData: any): void {
    console.log
      (eventData);

    let res: any[] = [];
    this.softwaresData[0] = this.allSoftwareData[0];
    //this.softwaresData[0].version = [...this.allSoftwareData[0].version];
    //if (!this.softwaresData[0].version) {
    //  this.softwaresData[0].version = [];
    //}

    //// Iterate over each version in allSoftwareData[0]
    //for (let version of this.allSoftwareData[0].version) {
    //  // Add each version to the version array in softwaresData[0]
    //  this.softwaresData[0].version.push(version);
    //}
    this.softwaresData[1] = this.allSoftwareData[1];
    

    if (eventData.type != '') {
        //let softwareArray = this.selectedLocation === 'India' ? this.softwaresData[0] : this.softwaresData[1];
      //res = softwareArray.filter((s: any) => s.type === eventData.type);

      if (this.selectedLocation === 'India') {
        this.softwaresData[0] = this.softwaresData[0].filter((s: any) => s.type === eventData.type);
      } else {
        this.softwaresData[1] = this.softwaresData[1].filter((s: any) => s.type === eventData.type);
      }
    }

    //if (eventData.stat != '') {
    //  alert(eventData.stat);
    //}

    //if (eventData.stat != '') {
    //  let softwareArray = this.selectedLocation === 'India' ? this.softwaresData[0] : this.softwaresData[1];
    //  for (let s of softwareArray) {
    //    let b = false;
    //    for (let v of s.version) {
    //      if ((v.isArchived == 1 && eventData.stat == 'Archive') || ((v.isArchived == null||v.isArchived == 0) && eventData.stat == 'Active')) {
    //        res.push(s);
    //        b = true;
    //        break;
    //      }
    //    }
    //    if (b) {
    //      break;
    //    }
    //  }

    //  if (this.selectedLocation === 'India') {
    //    this.softwaresData[0] = res;
    //  } else {
    //    this.softwaresData[1] = res;
    //  }
    //}

    //if (eventData.stock != '') {
    //  let softwareArray = this.selectedLocation === 'India' ? this.softwaresData[0] : this.softwaresData[1];
    //  for (let s of softwareArray) {
    //    for (let v of s.version) {
    //      if ((eventData == 'Low In Stock' && v.inStock <= 1) || (eventData == 'Out In Stock' && v.inStock <= 0) || (eventData == 'In Stock' && v.inStock > 1)) {

    //      }
    //    }
    //  }
    //}

    if (eventData.stock != '') {
      const softwareArrayIndex = this.selectedLocation === 'India' ? 0 : 1;

      this.softwaresData[softwareArrayIndex] = this.softwaresData[softwareArrayIndex].filter((s: any) => {
        s.version = s.version.filter((v: any) => {
          return (eventData.stock === 'Low In Stock' && v.inStock <= 1) ||
            (eventData.stock === 'Out In Stock' && v.inStock <= 0) ||
            (eventData.stock === 'In Stock' && v.inStock > 1);
        });

        return s.version.length > 0;
      });
    }


    console.log(this.allSoftwareData);
    console.log(this.softwaresData);
    console.log(res);
  }




  onarchiveclicked(eventData: any): void {
    console.log("archiveeventdata", eventData);

    // Prepare the data for the request body
    const body = {
      name: this.singlesoftware?.name || "", // If name is not available, provide an empty string
      version: this.singlesoftware?.version || "", // If version is not available, provide an empty string
      type: this.singlesoftware?.type || "", // If type is not available, provide an empty string
      isArchived: !this.singlesoftware?.isArchived, // Assuming eventData is a boolean value
      location: this.archive?.location || "" // If location is not available, provide an empty string
    };
    console.log("body", body);



    // Call the service method with the prepared body
    this.softwareService.UpdateSoftwareArchiveStatus(body).subscribe(
      (result: any | null) => {
        if (result) {
          // Handle the result here
          this.singlesoftware = result;
          console.log('Single software:', this.singlesoftware);
        } else {
          // Handle case when no software is found
          console.log('No software found for parameters:', body);
        }
      },
      error => {
        console.error('Error updating software archive status:', error);
      }
    );
  }



  onCardClicked(eventData: any): void {
    const parameters = {
      name: eventData.name,
      version: eventData.version,
      location: eventData.location,
      type: eventData.type

    };
    this.archive = parameters;

    this.softwareService.GetSingleSelected(parameters).subscribe(
      (result: any | null) => {
        if (result) {
          // Handle the result here
          this.singlesoftware = result;
          console.log('Single software :', this.singlesoftware);

        } else {
          console.log('No software found for parameters:', parameters);
        }
      },
      error => {
        console.error('Error fetching single software:', error);
      }
    );

    this.softwareService.GetHistory(parameters).subscribe(
      (result: any | null) => {
        if (result) {
          console.log(' software history:', result);
          this.softwarehistory = result;
          console.log(' software history:', this.softwarehistory);

        } else {
          console.log('No software history for parameters:', parameters);
        }
      },
      error => {
        console.error('Error fetching single software:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getSoftwaresData(false);
    this.getSoftwaretabledata();
    //this.filteredSoftware = this.softwaresData;
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
     // console.log(this.selectedLocation);


    });

  }

  Archived() {  
    if (this.isArchived == true) {
      this.isArchived = false;
    } else {
      this.isArchived = true;
    }
    this.getSoftwaresData(this.isArchived);
  }

  getSoftwaresData(arch: boolean): void {
    //alert(arch);
    this.softwareService.GetSoftware(arch).subscribe(
      data => {
        this.softwaresData = data;
        console.log(this.softwaresData);
        this.filteredSoftware = this.softwaresData;
        // Copy the entire array from data to allSoftwareData
        //this.allSoftwareData = JSON.parse(JSON.stringify(data));
          //[...data];
        //console.log(data);
        // Copy the version arrays for each element in data
        //for (let i = 0; i < data[0].length; i++) {
        //  // Copy the version array

        //    this.allSoftwareData[0][i].version = [...data[0][i].version];
        //}
        //for (let i = 0; i < data[1].length; i++) {
        //  // Copy the version array

        //  this.allSoftwareData[1][i].version = [...data[1][i].version];
        //}

        //this.allSoftwareData = JSON.parse(JSON.stringify(data));

       
        //for (let i = 0; i < this.allSoftwareData.length; i++) {
        //  for (let j = 0; j < this.allSoftwareData[i].length; j++) {
        //    //if (Array.isArray(this.allSoftwareData[i][j].version)) {
        //      this.allSoftwareData[i][j].version = JSON.parse(JSON.stringify(this.allSoftwareData[i][j].version));
        //    //}
        //  }
        //}

        //this.allSoftwareData = _.cloneDeep(data);
        //for (let i = 0; i < data[0].length; i++) {
        //  // Copy the version array

        //  this.allSoftwareData[0][i].version = _.cloneDeep(data[0][i].version);
        //}

        //for (let i = 0; i < data[1].length; i++) {
        //  // Copy the version array

        //  this.allSoftwareData[1][i].version = _.cloneDeep(data[1][i].version);
        //}

        //console.log("helo",this.allSoftwareData);
        //console.log("filter", this.filteredSoftware);





      },
      error => {
        console.error('Error fetching software data', error);
      }
    );
  }


  getRemainingDays(expDate: Date): number | string {
    const today = new Date();
    const expirationDate = new Date(expDate);

    // Check if the expiration date has already passed
    if (expirationDate < today) {
      return "Expired"; // Return "Expired" if the expiration date has passed
    }

    // Calculate the difference in milliseconds
    const timeDifference = expirationDate.getTime() - today.getTime();

    // Convert the difference to days
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return remainingDays;
  }


  getSoftwaretabledata(): void {
    this.softwareService.GettableSoftwares().subscribe(
      data => {
        this.softwarestableData = data;

        //console.log("tabel", this.softwarestableData);
        this.setRowData();
        //console.log('Row Data', this.rowData);

      },
      error => {
        console.error('Error fetching software data', error);
      }
    );
  }



  setRowData() {
    for (var i = 0; i < this.softwarestableData.length; i++) {

      let statusHTML = '';
      if (this.softwarestableData[i].status === 'Assigned') {
        statusHTML = '<div class="assigned-status">Assigned</div>';
      } else if (this.softwarestableData[i].status === 'Not Assigned') {
        statusHTML = '<div class="not-assigned-status">Not Assigned</div>';
      }

      this.rowData[i] = {
        "SNo": i + 1,
        "Software Name": this.softwarestableData[i].name,
        "Version": this.softwarestableData[i].version,
        "# Total": this.softwarestableData[i].assigned + this.softwarestableData[i].inventory ,
        "# Assigned": this.softwarestableData[i].assigned,
        "# Inventory": this.softwarestableData[i].inventory,
        "Expiry Date": this.softwarestableData[i].expDate,
        "Date of Purchase": this.softwarestableData[i].purchaseDates,
        


     
      }

    }
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
    //{ field: "Assigned To", width: 128, resizable: false, suppressMovable: true, },
    //{ field: "Assigned Date", width: 129, resizable: false, suppressMovable: true, },
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

