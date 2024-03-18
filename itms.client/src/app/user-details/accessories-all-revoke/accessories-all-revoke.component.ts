import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accessories-all-revoke',
  templateUrl: './accessories-all-revoke.component.html',
  styleUrls: ['./accessories-all-revoke.component.css']
})
export class AccessoriesAllRevokeComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() accessoriesDetails: any;
  @Input() revokeAllForm: FormGroup;
  @Input() actionsArray: any[];
  @Output() saveBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  lostAction: any;
  SubmittedAction: any;
  SubmittedActionUnassign: any;
  SubmitLaterAction: any;
  selectedReason: any;
  accessoryCount: number = 0;

  //newComment: string = '';
  //comments: any;

  showYesReason: boolean[] = [];
  showNoReason: boolean[] = [];
  ngOnInit() {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    if (!this.accessoriesDetails.length) {
      this.saveBtn.emit(false);
    }
    if (accessoryArray.length != 0) {
      this.checkIfSomethingIsMissing();
    }
  }
  constructor(private formBuilder: FormBuilder) { }
  ngOnChanges() {
    if (this.accessoriesDetails && this.revokeAllForm) {
      if (this.accessoriesDetails.length)
        this.saveBtn.emit(true);
     // console.log(this.accessoriesDetails);
      this.lostAction = this.actionsArray.find(a => a.actionName === 'Lost' || a.actionName === 'lost');
      this.SubmittedAction = this.actionsArray.find(a => a.actionName === 'Submitted' || a.actionName === 'submitted');
      this.SubmittedActionUnassign = this.actionsArray.find(a => a.actionName === 'Unassignable' || a.actionName === 'unassignable');
      this.SubmitLaterAction = this.actionsArray.find(a => a.actionName === 'Assigned' || a.actionName === 'assigned');
      for (let i = 0; i < this.accessoriesDetails.length; i++) {
        this.showYesReason[i] = false;
        this.showNoReason[i] = false;
      }
      this.initializeAccessoryFormArray();
    }
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    if (accessoryArray.length != 0) {
      this.checkIfSomethingIsMissing();
    }

    this.accessoryCount = 0;
    if (this.accessoriesDetails && this.accessoriesDetails.length) {
      for (const accessory of this.accessoriesDetails) {
        if (accessory.submittedBy === null) {
          this.accessoryCount++;
        }
      }
    }
  }

  initializeAccessoryFormArray() {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    //laptopArray.clear();
    if (accessoryArray.length === 0) {
      this.accessoriesDetails.forEach((accessory: any) => {
        accessoryArray.push(this.createAccessoryFormGroup(accessory));
      });
    }
    if (!this.accessoriesDetails)
      this.saveBtn.emit(false);
   // console.log(accessoryArray);
  }

  createAccessoryFormGroup(accessory: any) {
    return this.formBuilder.group({
      deviceLogId: [accessory.deviceLogId],
      actionId: [null],
      deviceComment: [null],
      deviceId: [accessory.deviceId]
    });
  }

  checkIfSomethingIsMissing() {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    for (let i = 0; i < accessoryArray.length; i++) {
      const accessoryFormGroup = accessoryArray.at(i) as FormGroup;
      const actionId = accessoryFormGroup.get('actionId')?.value;
      const deviceComment = accessoryFormGroup.get('deviceComment')?.value;
      if (!actionId || !deviceComment) {
        this.saveBtn.emit(true);
        return;
      }
    }
    this.saveBtn.emit(false);
  }

  showYesReasonOptions(index: number) {
    this.showYesReason[index] = !this.showYesReason[index];
    this.showNoReason[index] = false;
  }

  showNoReasonOptions(index: number) {
    this.showNoReason[index] = !this.showNoReason[index];
    this.showYesReason[index] = false;
  }
  handleReasonSelection(reason: string, index: number) {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;
    switch (reason) {
      case 'Perfect':
        if (this.SubmittedAction) {
          accessoryFormGroup.patchValue({ actionId: this.SubmittedAction.id });
        }
        break;
      case 'Unassignable':
        if (this.SubmittedActionUnassign) {
          accessoryFormGroup.patchValue({ actionId: this.SubmittedActionUnassign.id });
        }
        break;
      case 'Submitted Later':
        if (this.SubmitLaterAction) {
          accessoryFormGroup.patchValue({ actionId: this.SubmitLaterAction.id });
        }
        break;
      case 'Lost/Not Received':
        if (this.lostAction) {
          accessoryFormGroup.patchValue({ actionId: this.lostAction.id });
        }
        break;
      default:
        break;
    }
    this.checkIfSomethingIsMissing();
  }

  isReasonSelected(reason: string, index: number): boolean {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;

    // Check if actionId matches the selected reason
    switch (reason) {
      case 'Perfect':
        return this.SubmittedAction && accessoryFormGroup.value.actionId === this.SubmittedAction.id;
      case 'Unassignable':
        return this.SubmittedActionUnassign && accessoryFormGroup.value.actionId === this.SubmittedActionUnassign.id;
      case 'Submitted Later':
        return this.SubmitLaterAction && accessoryFormGroup.value.actionId === this.SubmitLaterAction.id;
      case 'Lost/Not Received':
        return this.lostAction && accessoryFormGroup.value.actionId === this.lostAction.id;
      default:
        return false;
    }
  }

  isReceivedYes(laptop: any, index: number): boolean {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;
    const receivedYes = accessoryFormGroup?.value.actionId === this.SubmittedAction?.id || accessoryFormGroup?.value.actionId === this.SubmittedActionUnassign?.id;
    //if (receivedYes) {
    //  this.showYesReason[index] = true; // Update the showYesReason array
    //  this.showNoReason[index] = false;
    //}
    return receivedYes;
  }

  isReceivedNo(laptop: any, index: number): boolean {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;
    const receivedNo = accessoryFormGroup?.value.actionId === this.SubmitLaterAction?.id ||
      accessoryFormGroup.value?.actionId === this.lostAction?.id;
    //if (receivedNo) {
    //  this.showYesReason[index] = true; // Update the showYesReason array
    //  this.showNoReason[index] = false;
    //}
    return receivedNo;
  }

  getDeviceComment(index: number): string {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;
    return accessoryFormGroup.value.deviceComment;
  }

  setDeviceComment(event: any, index: number) {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;
    const val = event.target.value;
    accessoryFormGroup.patchValue({ deviceComment: val });
    this.checkIfSomethingIsMissing();
  }
}
