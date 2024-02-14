import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  // Define Output property
/*  @Output() isLostChange = new EventEmitter<boolean>();*/
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

    //if the item is recieved then only call the updateRecievedBy function otherwise do not call it
    if ((document.getElementById('receivedYes') as HTMLInputElement).checked || (document.getElementById('lostNotReceived') as HTMLInputElement).checked) {
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
      );
    }

    //if it is a new comment
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
          //this.laptopDetails.comments.unshift(response);
          //console.log(this.laptopDetails.comments);
          this.newComment = '';
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
      this.newComment = '';
    }


  }

  showYesReason: boolean = false;
  showNoReason: boolean = false;

  showYesReasonOptions() {
    this.showYesReason = !this.showYesReason;
    this.showNoReason = false;
    
  }

  showNoReasonOptions() {
    this.showNoReason = !this.showNoReason;
    this.showYesReason = false;
  }

  resetRadioButtons() {
    const radioButtons = document.getElementsByName("deviceReceived");
    for (let i = 0; i < radioButtons.length; i++) {
      (radioButtons[i] as HTMLInputElement).checked = false;
    }
    this.showYesReason = false;
    this.showNoReason = false;
  }

  handleModalClose() {
    this.resetRadioButtons();
  }
  

  //// Function to handle radio button change
  //onRadioChange(event: Event): void {
  //  // Emit the value of the radio button
  //  const isLost = (event.target as HTMLInputElement).checked;
  //  this.isLostChange.emit(isLost);
  //}

  openModal(modalId: string) {
    const modelDiv = document.getElementById(modalId);
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  
}
