import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';

@Component({
  selector: 'app-software-revoke',
  templateUrl: './software-revoke.component.html',
  styleUrls: ['./software-revoke.component.css']
})
export class SoftwareRevokeComponent {
  @Input() softwareDetails: any;
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;

  selectedReason: any; // Define type for selectedReason

  newComment: string = '';
  comments: any;
  loggedUser: any;
  actionId: any;
  actionsArray: any[] = [];

  constructor(private commentService: EmployeeService, private deviceLogService: EmployeeService, private actionService: EmployeeService) {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      this.loggedUser = JSON.parse(storedUser);
    }

    this.actionService.getActions().subscribe(
      (actions) => {
        this.actionsArray = actions;
      },
      (error) => {
        console.error('Error fetching actions:', error);

      }
    )
  }

  saveAndFetchSoftware() {
    const SubmitLater = (document.getElementById('submittedLater') as HTMLInputElement)?.checked;
    const Unassignable = (document.getElementById('unassignable') as HTMLInputElement)?.checked;
    const Perfect = (document.getElementById('perfect') as HTMLInputElement)?.checked;
    const lostNotReceivedChecked = (document.getElementById('lostNotReceived') as HTMLInputElement)?.checked;

    if (lostNotReceivedChecked) {
      const var1 = this.softwareDetails.deviceLogId;
      const var2 = this.loggedUser.id;

      const lostAction = this.actionsArray.find(a => a.actionName === 'Lost');
      if (lostAction) {
        this.actionId = lostAction.id;
        console.log("Lost Action: ", this.actionId);
      }

      const var3 = this.actionId;

      this.deviceLogService.updateRecievedBy(var1, var2, var3).subscribe(
        (response) => {
          console.log(response);
          if (response && response.receivedBy) {
            const { firstName, lastName, recievedDate, actionName } = response.receivedBy;
            this.softwareDetails.recievedBy = `${firstName} ${lastName}`;
            this.softwareDetails.recievedByDate = `${recievedDate}`;
            this.softwareDetails.actionName = `${actionName}`;
          }
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    }

    if (Perfect || Unassignable) {
      const var1 = this.softwareDetails.deviceLogId;
      const var2 = this.loggedUser.id;

      const SubmittedAction = this.actionsArray.find(a => a.actionName === 'Submitted');
      if (SubmittedAction) {
        this.actionId = SubmittedAction.id;
        console.log("Submitted Action: ", this.actionId);
      }

      const var3 = this.actionId;

      this.deviceLogService.updateRecievedBy(var1, var2, var3).subscribe(
        (response) => {
          console.log(response);
          if (response && response.receivedBy) {
            const { firstName, lastName, recievedDate, actionName } = response.receivedBy;
            this.softwareDetails.recievedBy = `${firstName} ${lastName}`;
            this.softwareDetails.recievedByDate = `${recievedDate}`;
            this.softwareDetails.actionName = `${actionName}`;
          }
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    }

    if (SubmitLater) {
      const var1 = this.softwareDetails.deviceLogId;
      const var2 = this.loggedUser.id;

      const SubmitLaterAction = this.actionsArray.find(a => a.actionName === 'Assigned');
      if (SubmitLaterAction) {
        this.actionId = SubmitLaterAction.id;
        console.log("Submit Later Action: ", this.actionId);
      }

      const var3 = this.actionId;

      this.deviceLogService.updateRecievedBy(var1, var2, var3).subscribe(
        (response) => {
          console.log(response);
          if (response && response.receivedBy) {
            const { firstName, lastName, recievedDate, actionName } = response.receivedBy;
            this.softwareDetails.recievedBy = `${firstName} ${lastName}`;
            this.softwareDetails.recievedByDate = `${recievedDate}`;
            this.softwareDetails.actionName = `${actionName}`;
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
        softwareAllocationId: this.softwareDetails.softwareAllocationId,
        deviceLogId: this.softwareDetails.deviceLogId
      };

      console.log('Comment DTO:', commentDto);

      this.commentService.addSoftwareComment(commentDto).subscribe(
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
    const radioButtons = document.getElementsByName("softwareReceived");
    for (let i = 0; i < radioButtons.length; i++) {
      (radioButtons[i] as HTMLInputElement).checked = false;
    }
    this.showYesReason = false;
    this.showNoReason = false;
  }

  handleModalClose() {
    this.resetRadioButtons();
  }

  openModal(modalId: string) {
    const modelDiv = document.getElementById(modalId);
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

}
