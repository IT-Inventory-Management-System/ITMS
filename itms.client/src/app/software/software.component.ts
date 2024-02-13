import { Component, OnInit } from '@angular/core';
import { SoftwareService } from '../shared/services/Software.service';
import { ColDef } from 'ag-grid-community';
import * as XLSX from 'xlsx';

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


  constructor(private softwareService: SoftwareService) { } // Injecting SoftwareService

  ngOnInit(): void {
    this.getSoftwaresData();
  }

  getSoftwaresData(): void {
    this.softwareService.GetSoftware().subscribe(
      data => {
        console.log(data)
        this.softwaresData = data;
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
    {
      field: "Brand",
      resizable: false,
      width: 117,
      suppressMovable: true
    },
    {
      field: "Operating System", width: 144, resizable: false, suppressMovable: true,
      cellStyle: (params) => {
        // Check if the value in "Operating System" column is equal to "Windows 10"
        if (params.data && params.data['Operating System'] === 'Windows 10') {
          return {
            "background-color": "green",
            "color": "white", // Example color style
            "padding": "10px",// Example padding style

          };
        } else {
          return {
            "background-color": "black",
            "color": "white", // Example color style
            "padding": "10px", // Example padding style
          };
        }
      }
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
    { field: "Device Status", width: 119, resizable: false, suppressMovable: true, pinned: 'right' },
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

