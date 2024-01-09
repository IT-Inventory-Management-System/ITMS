import { Component } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-assign-history',
  templateUrl: './assign-history.component.html',
  styleUrls: ['./assign-history.component.css']
})
export class AssignHistoryComponent {

  commentDetails: any[];
  constructor(private dataService: DataService) { }


  get devicelogs() {
  
    return this.dataService.DeviceLog;
  }

 




}
