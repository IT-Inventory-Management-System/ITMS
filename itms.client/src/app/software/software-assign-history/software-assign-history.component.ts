import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-software-assign-history',
  templateUrl: './software-assign-history.component.html',
  styleUrls: ['./software-assign-history.component.css']
})
export class SoftwareAssignHistoryComponent {
  @Input() historyData: any;
}
