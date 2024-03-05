import { Component, Input } from '@angular/core';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-assign-laptop-comment',
  templateUrl: './assign-laptop-comment.component.html',
  styleUrls: ['./assign-laptop-comment.component.css']
})
export class AssignLaptopCommentComponent {
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
    this.selectedOption = this.assignDataManagementService.getState("laptopComments", this.index);
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("laptopComments", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }
  onInputChangeCommentBox(event: any): void {
    console.log(event.target.value);
    this.selectedOption = event.target.value;
    const laptopCommentsArray = this.assignAssetForm.get('deviceComments') as FormArray;

    if (laptopCommentsArray) {
      const controlIndex = laptopCommentsArray.controls.findIndex(control => control.get('index')?.value === this.index);
      if (controlIndex !== -1) {
        laptopCommentsArray.controls[controlIndex].get('deviceComments')?.setValue(event.target.value);
      } else {
        laptopCommentsArray.push(this.formBuilder.group({
          index: this.index,
          deviceComment: event.target.value
        }));
      }
    } else {
      console.error('FormArray "deviceComments" is null.');
    }
  }
}
