import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';


@Component({
  selector: 'app-stock-status-cell',
  templateUrl: './stock-status-cell.component.html',
  styleUrls: ['./stock-status-cell.component.css']
})
export class StockStatusCellComponent implements ICellRenderer {

  value: any;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

}
