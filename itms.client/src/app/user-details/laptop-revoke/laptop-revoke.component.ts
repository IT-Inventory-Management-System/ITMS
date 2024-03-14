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

  //@Output() reasonSelected = new EventEmitter<any>();

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
  saveCommentAndFetchComments() {
    const SubmitLater = (document.getElementById('submittedLater') as HTMLInputElement)?.checked;
    const Unassignable = (document.getElementById('unassignable') as HTMLInputElement)?.checked;
    const Perfect = (document.getElementById('perfect') as HTMLInputElement)?.checked;
    const lostNotReceivedChecked = (document.getElementById('lostNotReceived') as HTMLInputElement)?.checked;
 
   
    if (lostNotReceivedChecked) {
      const var1 = this.laptopDetails.deviceLogId;
      const var2 = this.loggedUser.id;

      const lostAction = this.actionsArray.find(a => a.actionName === 'Lost' || a.actionName === 'lost');
      if (lostAction) {
        this.actionId = lostAction.id;
       // console.log("Lost Action: ", this.actionId);
      }

      const var3 = this.actionId;

      this.deviceLogService.updateRecievedBy(var1, var2, var3).subscribe(
        (response) => {
         // console.log(response);
          if (response && response.receivedBy) {
            const { deviceLogId, firstName, lastName, recievedDate, actionName } = response.receivedBy;
            this.laptopDetails.submitedBy = `${firstName} ${lastName}`;
            this.laptopDetails.submitedByDate = `${recievedDate}`;
            this.laptopDetails.actionName = `${actionName}`;
            this.addNewComment(deviceLogId);
          }
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    }

    if (Perfect) {
      const var1 = this.laptopDetails.deviceLogId;
      const var2 = this.loggedUser.id;

      const SubmittedAction = this.actionsArray.find(a => a.actionName === 'Submitted' || a.actionName === 'submitted');
      if (SubmittedAction) {
        this.actionId = SubmittedAction.id;
       // console.log("Submitted Action: ", this.actionId);
      }

      const var3 = this.actionId;

      this.deviceLogService.updateRecievedBy(var1, var2, var3).subscribe(
        (response) => {
         // console.log(response);
          if (response && response.receivedBy) {
            const { deviceLogId, firstName, lastName, recievedDate, actionName } = response.receivedBy;
            this.laptopDetails.submitedBy = `${firstName} ${lastName}`;
            this.laptopDetails.submitedByDate = `${recievedDate}`;
            this.laptopDetails.actionName = `${actionName}`;
            this.addNewComment(deviceLogId);
          }
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    }

    if (Unassignable) {
      const var1 = this.laptopDetails.deviceLogId;
      const var2 = this.loggedUser.id;

      const UnassignableAction = this.actionsArray.find(a => a.actionName === 'Unassignable' || a.actionName === 'unassignable');
      if (UnassignableAction) {
        this.actionId = UnassignableAction.id;
      //  console.log("Unassignable Action: ", this.actionId);
      }

      const var3 = this.actionId;

      this.deviceLogService.updateRecievedBy(var1, var2, var3).subscribe(
        (response) => {
         // console.log(response);
          if (response && response.receivedBy) {
            const { deviceLogId, firstName, lastName, recievedDate, actionName } = response.receivedBy;
            this.laptopDetails.submitedBy = `${firstName} ${lastName}`;
            this.laptopDetails.submitedByDate = `${recievedDate}`;
            this.laptopDetails.actionName = `${actionName}`;
            this.addNewComment(deviceLogId);
          }
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    }

    if (SubmitLater) {
      const var1 = this.laptopDetails.deviceLogId;
      const var2 = this.loggedUser.id;

      const SubmitLaterAction = this.actionsArray.find(a => a.actionName === 'Assigned' || a.actionName === 'assigned');
      if (SubmitLaterAction) {
        this.actionId = SubmitLaterAction.id;
     //   console.log("Submit Later Action: ", this.actionId);
      }

      const var3 = this.actionId;

      this.deviceLogService.updateRecievedBy(var1, var2, var3).subscribe(
        (response) => {
          //console.log(response);
          if (response && response.receivedBy) {
            const { deviceLogId , firstName, lastName, recievedDate, actionName} = response.receivedBy;
            this.laptopDetails.submitedBy = `${firstName} ${lastName}`;
            this.laptopDetails.submitedByDate = `${recievedDate}`;
            this.laptopDetails.actionName = `${actionName}`;
            this.addNewComment(deviceLogId);
          }
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    }

  }

  addNewComment(deviceLogId: any) {
  //  console.log('comment called');
    const commentDto = {
      description: this.newComment,
      createdBy: this.loggedUser.id,
      createdAtUtc: new Date().toISOString(),
      deviceId: this.laptopDetails.deviceId,
      deviceLogId: deviceLogId
    };

   // console.log('Comment DTO:', commentDto);

    this.commentService.addRevokeComment(commentDto).subscribe(
      (response) => {

      //  console.log(response);
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
  
  //emitReasonSelected() {
  //  if (this.selectedReason) {
  //    this.reasonSelected.emit({ reason: this.selectedReason, deviceId: this.laptopDetails.deviceId });
  //  }
  //}


  openModal(modalId: string) {
    const modelDiv = document.getElementById(modalId);
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  
}
