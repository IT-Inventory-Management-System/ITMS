import { Component } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {

  constructor(private dataService: DataService) { }


  get devicelog() {
    console.log(this.dataService.DeviceLog);
    return this.dataService.DeviceLog;
    
  } 


}
