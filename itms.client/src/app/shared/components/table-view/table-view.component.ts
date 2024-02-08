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
 
}
