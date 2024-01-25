import { Component, Input, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';
import { Router } from '@angular/router'; 

export class UserCommentHistory {
  description: string;
  createdBy: string;
  createdAtUtc: string;
  deviceId: string;
  deviceLogId: string;
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
  comments: any;
  latestComment: UserCommentHistory | null = null; 

  constructor(private commentService: EmployeeService, private router: Router, private cdr: ChangeDetectorRef, private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
      // Check if userId changed and call API only if it's a different value
      this.saveCommentAndFetchComments();
    }
  }
  isShortLength(): boolean {
    return this.laptopDetails.comments.length <=2;
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
        deviceLogId: this.laptopDetails.deviceLogId 
      };

      console.log('Comment DTO:', commentDto);

      this.commentService.addComment(commentDto).subscribe(
        (response) => {
          console.log('Comment added successfully', response);
          this.laptopDetails.comments = [...this.laptopDetails.comments, response];
          this.newComment = '';

          
          this.latestComment = response;

          this.zone.run(() => {
            this.cdr.detectChanges();
          });
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
      this.newComment = '';
    }
  }

 
}
