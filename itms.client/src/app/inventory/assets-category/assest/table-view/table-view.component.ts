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
      "Model No": "Dell XPS 15",
      "Processor": "Intel Core i7",
      "Ram": "16GB",
      "Storage": "512GB SSD",
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
      "Action": "View Details",
      "Stock Status": "In Stock"
    },
    {
      "Operating System": "macOS Monterey",
      "Model No": "MacBook Pro",
      "Processor": "Apple M1 Pro",
      "Ram": "16GB",
      "Storage": "1TB SSD",
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
      "Action": "View Details",
      "Stock Status": "In Stock"
    },
    // Add more entries as needed...
  ];


  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    { field: " " },
    { field: "Operating System" },
    { field: "Model No" },
    { field: "Processor" },
    { field: "Ram" },
    { field: "Storage" },
    { field: "Serial No" },
    { field: "CYG ID" },
    { field: "# Stock Count" },
    { field: "Date of Purchase" },
    { field: "# Total" },
    { field: "# Assigned" },
    { field: "# Inventory" },
    { field: "Warranty (in Years)" },
    { field: "Assigned To" },
    { field: "Assigned Date" },
    { field: "Device Status" },
    { field: "Action" },
    { field: "Stock Status", pinned: 'right' }















  ];
}
