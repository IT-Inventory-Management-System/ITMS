import { Component, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class DeviceAddComment {
  description: string;
  createdBy: string;
  createdAtUtc: string;
  deviceId: string;
  deviceLogId: string;
}
export class CommentsComponent {

  isCommentSectionCollapsed = false;
  currentDeviceCygid: string;
  @Input() laptopDetails: any;
  DeviceLogInfo: any;
  newComment: string = '';
  

  toggleCommentSection() {
    
    this.isCommentSectionCollapsed = !this.isCommentSectionCollapsed;
    
    /*this.showcomment(cygid);*/
  }

  constructor(private dataService: DataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    
      // Check if userId changed and call API only if it's a different value
      this.saveComment();
    
  }


  saveComment() {
    if (this.newComment) {
      const commentDto = {
        description: this.newComment,
        createdBy: this.devicelog.userId,
        createdAtUtc: new Date().toISOString(),
        deviceId: this.devicelog.deviceId,
        deviceLogId: this.devicelog.deviceLogId
      };

      console.log('Comment DTO:', commentDto);

      this.dataService.postComment(commentDto).subscribe(
        (response) => {
          console.log('Comment added successfully', response);
          // this.getComments(); 
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
      this.newComment = '';
    }
  }

  get deviceDetails() {
    return this.dataService.DeviceDetails;
  }

  get devicelog() {
    this.DeviceLogInfo = this.dataService.DeviceLog;
    
    return this.dataService.DeviceLog;
  }
  

  get commentDetails() {
    return this.dataService.CommentDetails;
  }
}










