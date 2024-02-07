import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
  rowData = [
    {
      "Operating System": "Windows 10",
      "Brand":"hello",
      "Model No": "Dell Precision 3470",
      "Processor": "Intel Core i7",
      "Ram (GB)": "16GB",
      "Storage": "512GB ",
      "Serial No": "ABC123",
      "CYG ID": "1001",
      "# Stock Count": 5,
      "Date of Purchase": "2023-01-15",
      "# Total": 5,
      "# Assigned": 3,
      "# Inventory": 2,
      "Warranty (in Years)": 2,
      "Assigned To": "John Doe",
      "Assigned Date": "2023-01-20",
      "Device Status": "Active",
      "Action": "View",
      "Stock Status": "In Stock"
    },
    {
      "Operating System": "macOS Monterey",
      "Brand": "hello",
      "Model No": "MacBook Pro",
      "Processor": "Apple M1 Pro",
      "Ram (GB)": "16GB",
      "Storage": "1TB ",
      "Serial No": "XYZ456",
      "CYG ID": "1002",
      "# Stock Count": 8,
      "Date of Purchase": "2023-02-10",
      "# Total": 8,
      "# Assigned": 5,
      "# Inventory": 3,
      "Warranty (in Years)": 3,
      "Assigned To": "Jane Smith",
      "Assigned Date": "2023-02-15",
      "Device Status": "Active",
      "Action": "View",
      "Stock Status": "In Stock"
    },
    // Add more entries as needed...
  ];


  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {
      field: " ",
      resizable: false,
      suppressMovable: true,
      width:40
    },
    {
      field: "Brand",
      resizable: false,
      width: 117,
      suppressMovable: true
    },
    { field: "Operating System", width: 144, resizable: false, suppressMovable: true },
    { field: "Model No", width: 164, resizable: false, suppressMovable: true, },
    { field: "Processor", width: 350, resizable: false, suppressMovable: true, },
    { field: "Ram (GB)", width: 120, resizable: false, suppressMovable: true, },
    { field: "Storage", width: 103, resizable: false, suppressMovable: true, },
    { field: "Serial No", width: 160, resizable: false, suppressMovable: true, },
    { field: "CYG ID", width: 120, resizable: false, suppressMovable: true, },
    { field: "# Stock Count", width: 125, resizable: false, suppressMovable: true, },
    { field: "Date of Purchase", width: 170, resizable: false, suppressMovable: true, },
    { field: "# Total", width: 100, resizable: false, suppressMovable: true, },
    { field: "# Assigned", width: 109, resizable: false, suppressMovable: true, },
    { field: "# Inventory", width: 142, resizable: false, suppressMovable: true, },
    { field: "Warranty (in Years)", width: 152, resizable: false, suppressMovable: true, },
    { field: "Assigned To", width: 140, resizable: false, suppressMovable: true, },
    { field: "Assigned Date", width: 129, resizable: false, suppressMovable: true, },
    { field: "Device Status", width: 119, resizable: false, suppressMovable: true, },
    { field: "Action", width: 83, resizable: false, suppressMovable: true, },
    { field: "Stock Status", pinned: 'right', cellStyle: { 'border': 'none' }, width: 122, resizable: false, suppressMovable: true, }















  ];
 
}
