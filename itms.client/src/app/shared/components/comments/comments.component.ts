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

        if (response && response.comment) {
          // Prepend the new comment to the existing comments array
          this.comment.unshift({
            createdByNavigation: {
              firstName: response.comment.createdBy
            },
            createdAtUtc: response.comment.createdAt,
            description: response.comment.description
          });

          // Reset the new comment input
          this.newComment = '';

          // Manually trigger change detection
          this.cdr.detectChanges();
        } else {
          console.error('Invalid response format from the server:', response);
        }
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
