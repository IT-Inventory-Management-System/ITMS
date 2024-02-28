import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignhistory',
  templateUrl: './assignhistory.component.html',
  styleUrls: ['./assignhistory.component.css']
})
export class AssignhistoryComponent {
  @Input() historydata: any;

}
