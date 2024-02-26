import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  lostAction: any;
  SubmittedAction: any;
  SubmitLaterAction: any;
  selectedReason: any;

  //newComment: string = '';
  //comments: any;

  showYesReason: boolean[] = [];
  showNoReason: boolean[] = [];
  ngOnInit() {
    this.lostAction = this.actionsArray.find(a => a.actionName === 'Lost' || a.actionName === 'lost');
    this.SubmittedAction = this.actionsArray.find(a => a.actionName === 'Submitted' || a.actionName === 'submitted');
    this.SubmitLaterAction = this.actionsArray.find(a => a.actionName === 'Assigned' || a.actionName === 'assigned');
  }
  constructor(private formBuilder: FormBuilder) { }
  ngOnChanges() {
    if (this.accessoriesDetails && this.revokeAllForm) {
        for (let i = 0; i < this.accessoriesDetails.length; i++) {
          this.showYesReason[i] = false;
          this.showNoReason[i] = false;
        }
      }
      this.initializeAccessoryFormArray();
    }

  initializeAccessoryFormArray() {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    //laptopArray.clear();
    if (accessoryArray.length === 0) {
      this.accessoriesDetails.forEach((accessory: any) => {
        accessoryArray.push(this.createAccessoryFormGroup(accessory));
      });
    }
    console.log(accessoryArray);
  }

  createAccessoryFormGroup(accessory: any) {
    return this.formBuilder.group({
      deviceLogId: [accessory.deviceLogId],
      actionId: [null],
      deviceComment: [null]
    });
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
        accessoryFormGroup.patchValue({ actionId: this.SubmittedAction.id });
        break;
      case 'Unassignable':
        accessoryFormGroup.patchValue({ actionId: this.SubmittedAction.id });
        break;
      case 'Submitted Later':
        accessoryFormGroup.patchValue({ actionId: this.SubmitLaterAction.id });
        break;
      case 'Lost/Not Received':
        accessoryFormGroup.patchValue({ actionId: this.lostAction.id });
        break;
      default:
        break;
    }
  }

  isReasonSelected(reason: string, index: number): boolean {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;

    // Check if actionId matches the selected reason
    switch (reason) {
      case 'Perfect':
        return accessoryFormGroup.value.actionId === this.SubmittedAction.id;
      case 'Unassignable':
        return accessoryFormGroup.value.actionId === this.SubmittedAction.id;
      case 'Submitted Later':
        return accessoryFormGroup.value.actionId === this.SubmitLaterAction.id;
      case 'Lost/Not Received':
        return accessoryFormGroup.value.actionId === this.lostAction.id;
      default:
        return false;
    }
  }

  isReceivedYes(laptop: any, index: number): boolean {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;
    const receivedYes = accessoryFormGroup.value.actionId === this.SubmittedAction.id;
    //if (receivedYes) {
    //  this.showYesReason[index] = true; // Update the showYesReason array
    //  this.showNoReason[index] = false;
    //}
    return receivedYes;
  }

  isReceivedNo(laptop: any, index: number): boolean {
    const accessoryArray = this.revokeAllForm.get('Accessory') as FormArray;
    const accessoryFormGroup = accessoryArray.at(index) as FormGroup;
    const receivedNo = accessoryFormGroup.value.actionId === this.SubmitLaterAction.id ||
      accessoryFormGroup.value.actionId === this.lostAction.id;
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
  }
}
