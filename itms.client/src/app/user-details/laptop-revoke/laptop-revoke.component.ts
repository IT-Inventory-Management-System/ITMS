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

  constructor(private commentService: EmployeeService, private deviceLogService: EmployeeService) {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      this.loggedUser = JSON.parse(storedUser);
    }
  }

  saveCommentAndFetchComments() {

    const var1 = this.laptopDetails.deviceLogId;
    const var2 = this.loggedUser.id;
    this.deviceLogService.updateRecievedBy(var1, var2).subscribe(
      (response) => {
        
        console.log(response);
        if (response && response.receivedBy) {
          const { firstName, lastName, recievedDate } = response.receivedBy;
          this.laptopDetails.submitedBy = `${firstName} ${lastName}`;
          this.laptopDetails.submitedByDate = `${recievedDate}`;
        }
        
      },
      (error) => {
        console.error('Error :', error);
      }
    )

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
