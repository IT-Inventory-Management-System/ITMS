import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices/devices.component';
import { ColDef } from 'ag-grid-community';
import * as XLSX from 'xlsx';
import { MyCellComponent } from '../../../shared/components/my-cell/my-cell.component';
import { SelectedCountryService } from '../../../shared/services/selected-country.service';
import { formatDate } from '@angular/common';


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
  selectedModel: any;
  selectedFilter : any;

  
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
        "Date of Purchase": formatDate(this.deviceData[i].purchasedDate, 'dd-MM-yyyy', 'en-US'),
        //"# Total": '-',
        //"# Assigned": '-',
        //"# Inventory": '-',
        "Warranty (in Years)": this.calculateWarrantyYear(this.deviceData[i].warrantyDate),
        "Assigned To": this.deviceData[i].assignedToName,
        "Assigned Date": this.deviceData[i].assignedDate ? formatDate(this.deviceData[i].assignedDate, 'dd-MM-yyyy', 'en-US') : '',
        "Device Status": this.deviceData[i].status,
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
    /* { field: "Stock Status", pinned: 'right', cellStyle: { 'border': 'none' }, width: 122, resizable: false, suppressMovable: true, }*/

  ];
  filename = 'ExcelSheet.xlsx';
  exporttoexcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.filename);
  }

  calculateWarrantyYear(warrantyDateString: string): string {
    const warrantyDate = new Date(warrantyDateString);
    const currentDate = new Date();

    const yearsDifference = currentDate.getFullYear() - warrantyDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - warrantyDate.getMonth();

    let remainingYears = -1*yearsDifference;
    let remainingMonths = monthsDifference;

    if (monthsDifference < 0) {
      remainingYears--;
      remainingMonths += 12;
    }

    if (remainingMonths != 0) {
      if (remainingYears == 1 && remainingMonths == 1)
        return `${remainingYears} year ${remainingMonths} month`;
      else if (remainingYears == 1)
        return `${remainingYears} year ${remainingMonths} months`;
      else if (remainingMonths == 1)
        return `${remainingYears} years ${remainingMonths} month`;
      else
        return `${remainingYears} years ${remainingMonths} months`;
    }
    else {
      if (remainingYears == 1)
        return `${remainingYears} year`;
      else
        return `${remainingYears} years`;
    }
      

  }

  showModelTable(modelName: string) {
    this.selectedModel = modelName;
    this.loadModelData();
  }

  deviceModelColDefs: ColDef[] = [
    {
      field: "Brand",
      resizable: false,
      width: 117,
      suppressMovable: true
    },
    {
      field: "Operating System",
      width: 144,
      resizable: false,
      suppressMovable: true,
    },
    {
      field: "Processor",
      width: 350,
      resizable: false,
      suppressMovable: true,
    },
    {
      field: "Ram (GB)",
      width: 120,
      resizable: false,
      suppressMovable: true,
    },
    {
      field: "Storage",
      width: 103,
      resizable: false,
      suppressMovable: true,
    },
    /*{ field: "# Stock Count", width: 125, resizable: false, suppressMovable: true, },*/
    {
      field: "# Total",
      width: 100,
      resizable: false,
      suppressMovable: true,
    },
    {
      field: "# Assigned",
      width: 109,
      resizable: false,
      suppressMovable: true,
    },
    {
      field: "# Inventory",
      width: 142,
      resizable: false,
      suppressMovable: true,
    },
    { field: "Stock Status", pinned: 'right', cellStyle: { 'border': 'none' }, width: 122, resizable: false, suppressMovable: true, }

  ];

  modelRowDef: any[] = [];
  
  loadModelData() {

    const inputObject = {
      deviceModelId: this.selectedModel,
      locationId: this.locationId
    }

    this.deviceService.getDeviceModelData(inputObject).subscribe(

      (data) => {
        console.log('Model Data : ', data);
        this.setModelRowDef(data[0]);
        this.selectedView = 'table';
      },
      (error) => {
        console.error('Error fetching device model data', error);
      }
    );
  }

  setModelRowDef(modelData: any) {
    this.modelRowDef[0] = {
      'Brand': modelData.brand,
      'Operating System': modelData.os,
      'Processor': modelData.processor,
      'Ram (GB)': modelData.ram,
      Storage: modelData.storage,
      '# Total': modelData.total,
      '# Assigned': modelData.assigned,
      '# Inventory': modelData.inventory,
      'Stock Status': modelData.inventory <= 2 ? (modelData.inventory == 0 ? 'Out of Stock' : 'Low In Stock') : 'In Stock'
    }

    console.log(this.modelRowDef);
  }

  showFilter(filter: any) {
    console.log(filter);
    this.selectedFilter = filter
  }

  toggleView() {
    this.selectedModel = null;
  }

}
