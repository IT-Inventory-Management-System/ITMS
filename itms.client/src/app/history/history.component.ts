import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  CYGID: string = '';

  onApplyClicked(eventData: any): void {
    this.CYGID = eventData.CYGID; 
    console.log(eventData);
  }
}
