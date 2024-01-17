import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  isCommentSectionCollapsed = false;
  currentDeviceCygid: string;
  @Input() laptopDetails: any;

  toggleCommentSection() {
    
    this.isCommentSectionCollapsed = !this.isCommentSectionCollapsed;
    
    /*this.showcomment(cygid);*/
  }

  constructor(private dataService: DataService) { }

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  }

  get devicelog() {
    return this.dataService.DeviceLog;
  }
  

  get commentDetails() {
    return this.dataService.CommentDetails;
  }
}










