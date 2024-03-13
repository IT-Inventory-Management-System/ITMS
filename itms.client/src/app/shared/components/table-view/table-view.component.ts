import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnChanges {

  @Input() rowData: any[];
  @Input() colDefs: ColDef[];
  @Input() searchValue: string;

  @ViewChild('agGrid') agGrid: AgGridAngular;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue'] && this.agGrid && this.agGrid.api) {
      this.agGrid.api.setQuickFilter(this.searchValue);

      this.agGrid.api.forEachNode(node => {
        const rowDataItem = node.data;
        if (rowDataItem && node.rowIndex !== null && node.rowIndex !== undefined) {
          rowDataItem.SNo = node.rowIndex + 1;
        }
      });

      this.agGrid.api.refreshCells();
    }
  }



  calculateGridHeight(): number {
    const rowHeight = 45.5; 
    const headerHeight = 40; 
    const numberOfRows = this.rowData ? this.rowData.length : 0;
    return (numberOfRows * rowHeight) + headerHeight;
  }
}
