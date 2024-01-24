import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent {

  isCommentSectionCollapsed = false;
  currentDeviceCygid: string;
  @Input() deviceId: any;
  @Input() userId: any;
  @Input() deviceLogId: any;
  @Input() commentLength: any;
  @Input() comment: any;
  DeviceLogInfo: any;
  newComment: string = '';
  

  toggleCommentSection() {
    
    this.isCommentSectionCollapsed = !this.isCommentSectionCollapsed;
    
    /*this.showcomment(cygid);*/
  }

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

 

  saveComment() {
    if (this.newComment) {
      const commentDto = {
        description: this.newComment,
        createdBy: this.userId,
        createdAtUtc: new Date().toISOString(),
        deviceId: this.deviceId,
        deviceLogId: this.deviceLogId
      };

      console.log('Comment DTO:', commentDto);

      this.dataService.postComment(commentDto).subscribe(
        (response: any) => {
          console.log('Comment added successfully', response);

          // Update the comments array with the new comment
          this.comment.push({
            createdByNavigation: {
              firstName: response.createdByFirstName  // Assuming the response contains createdByFirstName
            },
            createdAtUtc: response.createdAtUtc,
            description: response.description
          });

          // Reset the new comment input
          this.newComment = '';

          // Manually trigger change detection
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
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










