import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {

  @Input() rowData: any[];
  @Input() colDefs: ColDef[];
  calculateGridHeight(): number {
   
    const rowHeight = 45.5; 
    const headerHeight = 40; 
    const numberOfRows = this.rowData ? this.rowData.length : 0;
    return (numberOfRows * rowHeight) + headerHeight;
  }
}
