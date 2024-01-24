import { Component, Input, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';

export class UserCommentHistory {
  description: string;
  createdBy: string;
  createdAtUtc: string;
  deviceId: string;
  deviceLogId: string; // New property
}


@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})


export class UserCommentsComponent {
  @Input() laptopDetails: any;
  @Input() softwareDetails: any;
  @Input() userId: any;

  isCommentCollapsed: boolean = false;
  newComment: string = '';

  constructor(private commentService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
      // Check if userId changed and call API only if it's a different value
      this.saveCommentAndFetchComments();
    }
  }

  toggleComment() {
    this.isCommentCollapsed = !this.isCommentCollapsed;
  }

  saveCommentAndFetchComments() {
    if (this.newComment) {
      const commentDto = {
        description: this.newComment,
        createdBy: this.userId,
        createdAtUtc: new Date().toISOString(),
        deviceId: this.laptopDetails.deviceId,
        deviceLogId: this.laptopDetails.deviceLogId // Use deviceLogId from laptopDe
      };

      console.log('Comment DTO:', commentDto);

      this.commentService.addComment(commentDto).subscribe(
        (response) => {
          console.log('Comment added successfully', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
      this.newComment = '';
    }
  }

 
}
