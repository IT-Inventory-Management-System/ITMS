import { Component, Input } from '@angular/core';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-assign-software-comment',
  templateUrl: './assign-software-comment.component.html',
  styleUrls: ['./assign-software-comment.component.css']
})
export class AssignSoftwareCommentComponent {
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  selectedOption: any;
  private closeFlagSubscription: Subscription;
  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService
  ) { }
  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("softwareComments", this.index);
  }
  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("softwareComments", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }
  onInputChangeCommentBox(event: any): void {
    this.selectedOption = event.target.value;
    const softwareCommentsArray = this.assignAssetForm.get('softwareComments') as FormArray;

    if (softwareCommentsArray) {
      const controlIndex = softwareCommentsArray.controls.findIndex(control => control.get('index')?.value === this.index);
      if (controlIndex !== -1) {
        softwareCommentsArray.controls[controlIndex].get('deviceComment')?.setValue(event.target.value);
      } else {
        softwareCommentsArray.push(this.formBuilder.group({
          index: this.index,
          deviceComment: event.target.value
        }));
      }
    } else {
      console.error('FormArray "deviceComments" is null.');
    }
    this.selectedOption = event.target.value;
    this.assignAssetForm.get('softwareComment')?.setValue(event.target.value);
  }
}
