import { Component, Input, SimpleChanges} from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';


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
 // latestComment: any; 

  constructor(private commentService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
  //  if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
    
  //    this.saveCommentAndFetchComments();
  //  }

  //  if (changes['laptopDetails'] && changes['laptopDetails'].currentValue) {
  //    this.sortCommentsAfterFetch(); // Sort comments after fetching
  //  }

  //}

  //sortCommentsAfterFetch() {
  //  if (this.laptopDetails.comments && this.laptopDetails.comments.length > 1) {
  //    this.laptopDetails.comments = this.laptopDetails.comments.sort((a: any, b: any) => {
  //      return new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime();
  //    });
  //  }
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
         
          console.log(response); 
          this.laptopDetails.comments.unshift(response);
          console.log(this.laptopDetails.comments);
          this.newComment = '';
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
      this.newComment = '';
    }
  }

 
}
