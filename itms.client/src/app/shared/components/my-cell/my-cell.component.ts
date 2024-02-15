import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-cell',
  templateUrl: './my-cell.component.html',
  styleUrls: ['./my-cell.component.css']
})
export class MyCellComponent implements ICellRenderer {

    value: any;
    agInit(params: ICellRendererParams): void {
      this.value = params.value;
    }

    refresh(params: ICellRendererParams<any, any, any>): boolean {
      return false;
    }

}
