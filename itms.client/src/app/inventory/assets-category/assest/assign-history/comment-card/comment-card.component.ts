import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  constructor(private dataService: DataService) { }


  get devicelog() {
    // Use safe navigation operator to handle null or undefined
    return this.dataService.DeviceLog?.length > 0 ? this.dataService.DeviceLog : null;
  }
  get commentDetails() {
    return this.dataService.CommentDetails;
  }



}
