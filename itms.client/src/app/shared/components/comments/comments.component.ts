import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  isCommentSectionCollapsed = false;

  toggleCommentSection() {
    this.isCommentSectionCollapsed = !this.isCommentSectionCollapsed;
  }
 
  constructor(private dataService: DataService) { }


  get devicelog() {
    console.log(this.dataService.DeviceLog)
    return this.dataService.DeviceLog;

  } 

}
