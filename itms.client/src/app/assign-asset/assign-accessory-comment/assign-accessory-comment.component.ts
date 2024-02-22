 import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-accessory-comment',
  templateUrl: './assign-accessory-comment.component.html',
  styleUrls: ['./assign-accessory-comment.component.css']
})
export class AssignAccessoryCommentComponent {
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService
  ) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (closeFlag) {
        this.selectedOption = null;
      }
    });
  }
  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("accessoryComments",this.index);
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("accessoryComments", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }
  onInputChangeCommentBox(event: any): void {
    this.selectedOption = event.target.value;
    const accessoryCommentsArray = this.assignAssetForm.get('accessoryComments') as FormArray;
    if (accessoryCommentsArray) {
      const controlIndex = accessoryCommentsArray.controls.findIndex(control => control.get('index')?.value === this.index);
      if (controlIndex !== -1) {
        accessoryCommentsArray.controls[controlIndex].get('accessoryComments')?.setValue(event.target.value);
      } else {
        accessoryCommentsArray.push(this.formBuilder.group({
          index: this.index,
          deviceComment: event.target.value
        }));
      }
    } else {
      console.error('FormArray "deviceComments" is null.');
    }
  }
}
