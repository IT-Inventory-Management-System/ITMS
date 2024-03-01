import { Component, OnInit } from '@angular/core';
import { SoftwareService } from '../shared/services/Software.service';
import { ColDef } from 'ag-grid-community';
import * as XLSX from 'xlsx';
import { LocationService } from '../shared/services/location.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  selectedAccessoryIndex: number = 0;

  allSoftwareData: any[];
  selectedView: string = 'card';
  softwaresData: any[][] = [[], []]; // Define softwaresData array
  softwarestableData: any[];
  version: string[];
  rowData: any[] = [];
  selectedLocation: any = "India";
  parameters: any = null;
  singlesoftware: any = null;
  softwarehistory: any = null;
  archive: any;
  isArchived: boolean = false;
  userDataJSON: any;
  UserId: any;

  filteredSoftware: any[][] = [[], []];
  filterValues: string = '';
  expiringtag: boolean = false;
  searchValue: string = '';
  archivedAttributes: any = {
    location:'',
    selectedTypes: [],
    selectedStock: [],
    tableArchived:'',
    from: '',
    to: '',
    stat: '',
    filter:false
  }

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



  //applySoftwareFilter(event: Event) {
  //  const keyword = (event.target as HTMLInputElement).value.toLowerCase().trim(); // Get the input value and convert to lowercase
  //  // Check if selectedLocation is 'India'
  //  if (this.selectedLocation === 'India') {
  //    // Filter software cards from filteredSoftware[0] based on the keyword
  //    this.filteredSoftware[0] = this.softwaresData[0].filter((software: any) =>
  //      software.name.toLowerCase().includes(keyword)
  //    );
  //  } else {
  //    // Filter software cards from filteredSoftware[1] based on the keyword
  //    this.filteredSoftware[1] = this.softwaresData[1].filter((software: any) =>
  //      software.name.toLowerCase().includes(keyword)
  //    );
  //  }
  //}

  applySoftwareFilter() {
    const keyword = this.filterValues.toLowerCase().trim(); // Get filter keyword
    // Filter software based on the keyword
    this.filteredSoftware = this.softwaresData.map(softwareGroup =>
      softwareGroup.filter(software=>software.name.toLowerCase().includes(keyword)
      )
    );
  }

  passesFilter(software: any): boolean {
    const keyword = this.filterValues.toLowerCase().trim(); // Get filter keyword
    return software.name.toLowerCase().includes(keyword);
  }
 


  constructor(private softwareService: SoftwareService, private LocationService: LocationService, private selectedCountryService: SelectedCountryService, private toastr: ToastrService) { }

  onApplyClicked(eventData: any): void {
    console.log
      ("event data", eventData);
    const fromDate = eventData.from ? eventData.from.toISOString().split('T')[0] : ''; // Convert From Date to string
    const toDate = eventData.to ? eventData.to.toISOString().split('T')[0] : '';

    const body:any = {
      location: this.selectedLocation,
      IsArchived: this.isArchived,
      selectedType: eventData.selectedTypes,
      selectedStock: eventData.selectedStock,
      tableArchived: eventData.stat,
    }
    if (eventData.filter == true) {
      this.archivedAttributes.selectedTypes = eventData.selectedTypes;
      this.archivedAttributes.selectedStock = eventData.selectedStock;
      this.archivedAttributes.tableArchived = eventData.stat;
    }
    if (fromDate !== null) {
      body.From = fromDate;
      this.archivedAttributes.from = fromDate;
    }
    if (toDate !== null) {
      body.To = toDate;
      this.archivedAttributes.to = toDate;
    }
   // console.log("archivedAttributes", this.archivedAttributes);


    this.softwareService.FilterSoftware(body).subscribe(
      (result: any | null) => {
        if (result) {
          this.softwaresData = result;
          this.filteredSoftware = this.softwaresData;
          const parameters = {
            name: result[0][0].name,
            version: result[0][0].version,
            location: this.selectedLocation,
            type: result[0][0].type
          };
          this.onCardClicked(parameters, 0);
        } else {
          console.log('No software found for parameters:', body);
        }
      },
      error => {
        console.error('Error updating software archive status:', error);
      }
    );

    this.softwareService.FilterSoftwareTable(body).subscribe(
      (result: any | null) => {
        if (result) {
          this.softwarestableData = result;

        //  console.log("tabel", this.softwarestableData);
          this.setRowData();
        } else {
          console.log('No software found for parameters:', body);
        }
      },
      error => {
        console.error('Error updating software archive status:', error);
      }
    );
  }


  onarchiveclicked(eventData: any): void {
   // console.log("archiveeventdata", eventData);

    // Prepare the data for the request body
    const body = {
      userid: this.UserId,
      name: this.singlesoftware?.name || "", // If name is not available, provide an empty string
      version: this.singlesoftware?.version || "", // If version is not available, provide an empty string
      type: this.singlesoftware?.type || "", // If type is not available, provide an empty string
      isArchived: !this.singlesoftware?.isArchived, // Assuming eventData is a boolean value
      location: this.archive?.location || "" // If location is not available, provide an empty string
    };
  //  console.log("body", body);


    //this.toastr.success("Data posted successfully");
    // Call the service method with the prepared body
    this.softwareService.UpdateSoftwareArchiveStatus(body).subscribe(
      (result: any | null) => {
        if (result) {
          // Handle the result here
       //   this.singlesoftware = result;
       //   console.log('Single software:', this.singlesoftware);
          this.toastr.success("Data posted successfully");
        } else {
          // Handle case when no software is found
          console.log('No software found for parameters:', body);
          this.toastr.error("Error in posting data");
        }
      },
      error => {
        console.error('Error updating software archive status:', error);
      }
    );
    //if (this.archivedAttributes.selectedType.length === 0 && this.archivedAttributes.selectedStock.length === 0 && this.archivedAttributes.from === '' && this.archivedAttributes.to === '') {
    //  this.getSoftwaresData(this.isArchived);
    //} else {
    //  this.onApplyClicked(this.archivedAttributes);
    //}
  }



  onCardClicked(eventData: any, index: number): void {
    //if (this.selectedAccessoryIndex === index) {
      //this.selectedAccessoryIndex = -1; // Deselect the card if it's already selected
    //} else {
      this.selectedAccessoryIndex = index; // Select the clicked card
    //}

    this.expiringtag = true;
    const parameters = {
      name: eventData.name,
      version: eventData.version,
      location: eventData.location,
      type: eventData.type

    };
    console.log("parameters", parameters);
    this.archive = parameters;

    this.softwareService.GetSingleSelected(parameters).subscribe(
      (result: any | null) => {
        if (result) {
          // Handle the result here
          this.singlesoftware = result;
         // console.log('Single software :', this.singlesoftware);

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
       //   console.log(' software history:', result);
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
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;
   // console.log("adminid", this.UserId);
    this.getSoftwaresData(false);
    
    //this.filteredSoftware = this.softwaresData;
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      this.onVariableChanged();
     // console.log(this.selectedLocation);
      this.getSoftwaretabledata(this.selectedLocation);
    });

  }
  onVariableChanged() {

  }

  Archived() {  
    if (this.isArchived == true) {
      this.isArchived = false;
    } else {
      this.isArchived = true;
    }
    if (this.archivedAttributes.selectedTypes.length === 0 && this.archivedAttributes.selectedStock.length === 0 && this.archivedAttributes.from === '' && this.archivedAttributes.to === '') {
      this.getSoftwaresData(this.isArchived);
    } else {
      this.onApplyClicked(this.archivedAttributes);
    }

  }

  getSoftwaresData(arch: boolean): void {
    //alert(arch);
    this.softwareService.GetSoftware(arch).subscribe(
      data => {
        this.softwaresData = data;
        console.log(this.softwaresData);
        this.filteredSoftware = this.softwaresData;
        const parameters = {
          name: data[0][0].name,
          version: data[0][0].version,
          location: this.selectedLocation,
          type: data[0][0].type
        };
        this.onCardClicked(parameters, 0);
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


  getSoftwaretabledata(ctry: any): void {
    const params = {
      country: ctry
    }
    this.softwareService.GettableSoftwares(params).subscribe(
      data => {
        this.softwarestableData = data;
        
      //  console.log("tabel", this.softwarestableData);
        this.setRowData();
        //console.log('Row Data', this.rowData);

      },
      error => {
        console.error('Error fetching software data', error);
      }
    );
  }



  setRowData() {
    this.rowData = [];
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
        "Type": this.softwarestableData[i].type ,
        "Date of Purchase": this.softwarestableData[i].purchasedDate,
        "Expiry Date": this.softwarestableData[i].expireyDate,
        "Assigned To": this.softwarestableData[i].assignedTo,
        "Assigned By": this.softwarestableData[i].assignedBy,
        "Assigned Date": this.softwarestableData[i].assignedDate,
        "isArchived": this.softwarestableData[i].isArchived,
     
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
    { field: "Type", width: 100, resizable: false, suppressMovable: true, },
    { field: "Date of Purchase", width: 170, resizable: false, suppressMovable: true, },
    { field: "Expiry Date", width: 150, resizable: false, suppressMovable: true, },
    { field: "Assigned To", width: 150, resizable: false, suppressMovable: true, },
    { field: "Assigned By", width: 150, resizable: false, suppressMovable: true, },
    { field: "Assigned Date", width: 150, resizable: false, suppressMovable: true, },
    { field: "isArchived", pinned: 'right', width: 150, resizable: false, suppressMovable: true, },

    //{ field: "Software Status", width: 135, resizable: false, suppressMovable: true, },
    // { field: "Stock Status", pinned: 'right', cellStyle: { 'border': 'none' }, width: 122, resizable: false, suppressMovable: true, }

  ];
  filename = 'ExcelSheet.xlsx';
  exporttoexcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.filename);
  }
}

