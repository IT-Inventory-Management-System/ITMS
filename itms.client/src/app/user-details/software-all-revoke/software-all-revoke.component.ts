import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-software-all-revoke',
  templateUrl: './software-all-revoke.component.html',
  styleUrls: ['./software-all-revoke.component.css']
})
export class SoftwareAllRevokeComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() softwareDetails: any;
  @Input() revokeAllForm: FormGroup;
  @Input() actionsArray: any[];
  @Output() nextBtn: EventEmitter<boolean> = new EventEmitter<boolean>();
  SubmittedAction: any;
  constructor(private formBuilder: FormBuilder) { }
  ngOnChanges() {
    console.log(this.softwareDetails);
    console.log(this.actionsArray);
    if (this.softwareDetails && this.revokeAllForm && this.actionsArray) {
      this.SubmittedAction = this.actionsArray.find(a => a.actionName === 'Submitted' || a.actionName === 'submitted');
      this.initializeSoftwareFormArray();
    }
    }

  initializeSoftwareFormArray() {
    const SoftwareArray = this.revokeAllForm.get('Software') as FormArray;
    //laptopArray.clear();
    if (SoftwareArray.length === 0) {
      this.softwareDetails.forEach((software: any) => {
        SoftwareArray.push(this.createSoftwareFormGroup(software));
      });
    }
    console.log(SoftwareArray);
  }

  createSoftwareFormGroup(software: any) {
    return this.formBuilder.group({
      deviceLogId: [software.deviceLogId],
      softwareAllocationId: [software.softwareAllocationId],
      actionId: this.SubmittedAction.id,
      deviceId: [software.softwareAllocationId]
    });
  }
}
