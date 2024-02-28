import { Component, Input } from '@angular/core';
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
  SubmittedAction: any;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
     this.SubmittedAction = this.actionsArray.find(a => a.actionName === 'Submitted' || a.actionName === 'submitted');
   }
  ngOnChanges() {
    if (this.softwareDetails && this.revokeAllForm)
      console.log(this.softwareDetails);
      this.initializeSoftwareFormArray();
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
    });
  }
}
