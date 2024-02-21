import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices/devices.component';
import { ColDef } from 'ag-grid-community';
import * as XLSX from 'xlsx';
import { MyCellComponent } from '../../../shared/components/my-cell/my-cell.component';
import { SelectedCountryService } from '../../../shared/services/selected-country.service';

@Component({
  selector: 'app-assest',
  templateUrl: './assest.component.html',
  styleUrls: ['./assest.component.css']
})
export class AssestComponent {
  isArchived: boolean = false;
  selectedItem: any;
  locationId: string = '';

  selectedView: string = 'card';
  deviceData: any[] = [];
  rowData: any[] = [];
  searchValue: string = '';



  @ViewChild('appDevices') appDevices: DevicesComponent;
  constructor(private deviceService: DataService, private dataService: DataService, private selectedCountryService: SelectedCountryService) { }
  getDeviceLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            //alert(this.locationId);
            this.loadDeviceData();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }
  ngOnInit(): void {
    //this.loadDeviceData();
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getDeviceLocation();
    });
  }

  dropdownItems = [
    { id: "Windows", name: 'Windows Laptop' },
    { id: "Mac", name: 'Macbook' },

  ];

  onCheckboxChange(event: any) {
    if (event.target.checked == true) {
      this.appDevices.showArchivedDevices();
    } else {
      this.appDevices.showDevices();
    }
  }


  loadDeviceData() {
    this.deviceService.getDevicesCyg(this.locationId).subscribe(
      
      (data) => {
        console.log(this.locationId);
        //alert(this.locationId);
        console.log(data);
        this.deviceData = data;
        console.log('All Device Data', data);
        this.setRowData();
        console.log('Row Data', this.rowData);
      },
      (error) => {
        console.error('Error fetching device data', error);
      }
    );
  }

  setRowData() {
    
    this.rowData = [];
    for (var i = 0; i < this.deviceData.length; i++) {

      this.rowData[i] = {
        "SNo": i + 1,
        "Brand": this.deviceData[i].brand,
        "Operating System": this.deviceData[i].os,
        "Model No": this.deviceData[i].modelNo,
        "Processor": this.deviceData[i].processor,
        "Ram (GB)": this.deviceData[i].ram,
        "Storage": this.deviceData[i].storage,
        "Serial No": this.deviceData[i].serialNumber,
        "CYG ID": this.deviceData[i].cygid,
        /*"# Stock Count": '-',*/
        "Date of Purchase": this.deviceData[i].purchasedDate,
        //"# Total": '-',
        //"# Assigned": '-',
        //"# Inventory": '-',
        "Warranty (in Years)": this.deviceData[i].warrantyDate,
        "Assigned To": this.deviceData[i].assignedToName,
        "Assigned Date": this.deviceData[i].assignedDate,
        "Device Status": this.deviceData[i].status,
        "Action": '-',
        //"Stock Status": '-'
      }

    }
  }

  onFilterTextBoxChanged() {
    console.log('Searched Value : ', this.searchValue);
  }

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {
      field: "SNo",
      resizable: false,
      suppressMovable: true,
      width: 65
    },
    {
      field: "Brand",
      resizable: false,
      width: 117,
      suppressMovable: true
    },
    {
      field: "Operating System", width: 144, resizable: false, suppressMovable: true,
    },
    { field: "Model No", width: 164, resizable: false, suppressMovable: true, },
    { field: "Processor", width: 350, resizable: false, suppressMovable: true, },
    { field: "Ram (GB)", width: 120, resizable: false, suppressMovable: true, },
    { field: "Storage", width: 103, resizable: false, suppressMovable: true, },
    { field: "Serial No", width: 160, resizable: false, suppressMovable: true, },
    { field: "CYG ID", width: 120, resizable: false, suppressMovable: true, },
    /*{ field: "# Stock Count", width: 125, resizable: false, suppressMovable: true, },*/
    { field: "Date of Purchase", width: 170, resizable: false, suppressMovable: true, },
    //{ field: "# Total", width: 100, resizable: false, suppressMovable: true, },
    //{ field: "# Assigned", width: 109, resizable: false, suppressMovable: true, },
    //{ field: "# Inventory", width: 142, resizable: false, suppressMovable: true, },
    { field: "Warranty (in Years)", width: 152, resizable: false, suppressMovable: true, },
    { field: "Assigned To", width: 140, resizable: false, suppressMovable: true, },
    { field: "Assigned Date", width: 129, resizable: false, suppressMovable: true, },
    { field: "Device Status", width: 119, resizable: false, suppressMovable: true, pinned: 'right', cellRenderer: MyCellComponent },
    { field: "Action", width: 83, resizable: false, suppressMovable: true, },
    /* { field: "Stock Status", pinned: 'right', cellStyle: { 'border': 'none' }, width: 122, resizable: false, suppressMovable: true, }*/

  ];
  filename = 'ExcelSheet.xlsx';
  exporttoexcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.filename);
  }
}
