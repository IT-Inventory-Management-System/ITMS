import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  commentDetails: any[];
  isCommentSectionCollapsed = false;
  currentDeviceCygid: string;

  toggleCommentSection(cygid: string) {
    console.log(cygid);
    this.isCommentSectionCollapsed = !this.isCommentSectionCollapsed;
    this.currentDeviceCygid = cygid;
    /*this.showcomment(cygid);*/
  }

  constructor(private dataService: DataService) { }

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  }

  get devicelog() {
    return this.dataService.DeviceLog;
  }

  //showcomment(cygid: string) {
  //  this.dataService.getComment(cygid)
  //    .subscribe(data => {
  //      this.commentDetails = data;
  //      console.log('comment' + this.commentDetails);
  //    });
  //}
}










