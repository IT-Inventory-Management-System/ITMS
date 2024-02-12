import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';

@Component({
  selector: 'app-laptop-revoke',
  templateUrl: './laptop-revoke.component.html',
  styleUrls: ['./laptop-revoke.component.css']
})
export class LaptopRevokeComponent {
  @Input() laptopDetails: any;
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;

  newComment: string = '';
  comments: any;
  loggedUser: any;

  constructor(private commentService: EmployeeService) {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      this.loggedUser = JSON.parse(storedUser);
    }
  }

  saveCommentAndFetchComments() {

    if (this.newComment) {
      const commentDto = {
        description: this.newComment,
        createdBy: this.loggedUser.id,
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



    console.log("Device Log Id: ", this.laptopDetails.deviceLogId);
    console.log("RecievedBy Id: ", this.loggedUser.id);

    


  }

  openModal(modalId: string) {
    const modelDiv = document.getElementById(modalId);
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModal(modalId: string) {
    const modelDiv = document.getElementById(modalId);
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
