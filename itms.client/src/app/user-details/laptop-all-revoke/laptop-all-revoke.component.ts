import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-laptop-all-revoke',
  templateUrl: './laptop-all-revoke.component.html',
  styleUrls: ['./laptop-all-revoke.component.css']
})
export class LaptopAllRevokeComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() laptopDetails: any[];
  @Input() actionsArray: any[];
  @Input() revokeAllForm: FormGroup;
  @Output() nextBtn: EventEmitter<boolean> = new EventEmitter<boolean>();


  selectedReason: any;
  lostAction: any;
  SubmittedAction: any;
  SubmittedActionUnassign: any;
  SubmitLaterAction: any;
  //newComment: string = '';
  //comments: any;
  showYesReason: boolean[] = []; 
  showNoReason: boolean[] = [];

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.revokeAllForm);
  }

  ngOnChanges() {
    if (this.laptopDetails && this.revokeAllForm) {
      this.nextBtn.emit(true);
      console.log(this.laptopDetails);
      this.lostAction = this.actionsArray.find(a => a.actionName === 'Lost' || a.actionName === 'lost');
      this.SubmittedAction = this.actionsArray.find(a => a.actionName === 'Submitted' || a.actionName === 'submitted');
      this.SubmittedActionUnassign = this.actionsArray.find(a => a.actionName === 'Unassignable' || a.actionName === 'unassignable');
      this.SubmitLaterAction = this.actionsArray.find(a => a.actionName === 'Assigned' || a.actionName === 'assigned');
      //console.log(this.)
      for (let i = 0; i < this.laptopDetails.length; i++) {
        this.showYesReason[i] = false;
        this.showNoReason[i] = false;
      }
      this.initializeLaptopFormArray();
    }
  }

  initializeLaptopFormArray() {
    const laptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    //laptopArray.clear();
    if (laptopArray.length === 0) {
      this.laptopDetails.forEach((laptop: any) => {
        laptopArray.push(this.createLaptopFormGroup(laptop));
      });
    }
  }

  createLaptopFormGroup(laptop: any) {
    return this.formBuilder.group({
      deviceLogId: [laptop.deviceLogId],
      actionId: [null],
      deviceComment: [null]
    });
  }

  checkIfSomethingIsMissing() {
    const LaptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    for (let i = 0; i < LaptopArray.length; i++) {
      const accessoryFormGroup = LaptopArray.at(i) as FormGroup;
      const actionId = accessoryFormGroup.get('actionId')?.value;
      const deviceComment = accessoryFormGroup.get('deviceComment')?.value;
      if (!actionId || !deviceComment) {
        this.nextBtn.emit(true);
        return;
      }
    }
    this.nextBtn.emit(false);
  }
  showYesReasonOptions(index: number) {
    this.showYesReason[index] = true;
    this.showNoReason[index] = false;
    //this.cdr.detectChanges(); 
  }

  showNoReasonOptions(index: number) {
    this.showNoReason[index] = true;
    this.showYesReason[index] = false;
    //this.cdr.detectChanges(); 
  }

  handleReasonSelection(reason: string, index: number) {
    const laptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    const laptopFormGroup = laptopArray.at(index) as FormGroup;
    console.log(this.SubmittedAction);
    console.log(this.actionsArray);
   // console.log("reason is: ", reason);
    //const selectedAction = this.actionsArray.find(action => action.actionName === reason);
    //console.log(selectedAction);
    //console.log(this.actionsArray);


    //if (selectedAction) {
    //  laptopFormGroup.patchValue({ actionId: selectedAction.id }); // Set actionId
    //}

    switch (reason) {
      case 'Perfect':
        if (this.SubmittedAction) {
          console.log(this.SubmittedAction.id);
          laptopFormGroup.patchValue({ actionId: this.SubmittedAction.id });
        }
        break;
      case 'Unassignable':
        if (this.SubmittedActionUnassign) {
          console.log(this.SubmittedActionUnassign.id);
          laptopFormGroup.patchValue({ actionId: this.SubmittedActionUnassign.id });
        }
        break;
      case 'Submitted Later':
        if (this.SubmitLaterAction) {
          console.log(this.SubmitLaterAction.id);
          laptopFormGroup.patchValue({ actionId: this.SubmitLaterAction.id });
        }
        break;
      case 'Lost/Not Received':
        if (this.lostAction) {
          console.log(this.lostAction.id);
          laptopFormGroup.patchValue({ actionId: this.lostAction.id });
        }
        break;
      default:
        break;
    }
    this.checkIfSomethingIsMissing();
  }

  isReasonSelected(reason: string, index: number): boolean {
    const laptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    const laptopFormGroup = laptopArray.at(index) as FormGroup;

    // Check if actionId matches the selected reason
    switch (reason) {
      case 'Perfect':
        return this.SubmittedAction && laptopFormGroup.value.actionId === this.SubmittedAction.id;
      case 'Unassignable':
        return this.SubmittedActionUnassign && laptopFormGroup.value.actionId === this.SubmittedActionUnassign.id;
      case 'Submitted Later':
        return this.SubmitLaterAction && laptopFormGroup.value.actionId === this.SubmitLaterAction.id;
      case 'Lost/Not Received':
        return this.lostAction && laptopFormGroup.value.actionId === this.lostAction.id;
      default:
        return false;
    }
  }

  isReceivedYes(laptop: any, index: number): boolean {
    const laptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    const laptopFormGroup = laptopArray.at(index) as FormGroup;
    const receivedYes = laptopFormGroup.value.actionId === this.SubmittedAction?.id || laptopFormGroup.value.actionId === this.SubmittedActionUnassign?.id;
    //if (receivedYes) {
    //  this.showYesReason[index] = true; // Update the showYesReason array
    //  this.showNoReason[index] = false;
    //}
    return receivedYes;
  }

  isReceivedNo(laptop: any, index: number): boolean {
    const laptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    const laptopFormGroup = laptopArray.at(index) as FormGroup;
    const receivedNo = laptopFormGroup.value.actionId === this.SubmitLaterAction?.id ||
      laptopFormGroup.value.actionId === this.lostAction?.id;
    //if (receivedNo) {
    //  this.showYesReason[index] = true; // Update the showYesReason array
    //  this.showNoReason[index] = false;
    //}
    return receivedNo;
  }

  getDeviceComment(index: number): string {
    const laptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    const laptopFormGroup = laptopArray.at(index) as FormGroup;
    return laptopFormGroup.value.deviceComment;
  }

  setDeviceComment(event: any, index: number) {
    const laptopArray = this.revokeAllForm.get('Laptop') as FormArray;
    const laptopFormGroup = laptopArray.at(index) as FormGroup;
    const val = event.target.value;
    laptopFormGroup.patchValue({ deviceComment: val });
    this.checkIfSomethingIsMissing();
  }
}
