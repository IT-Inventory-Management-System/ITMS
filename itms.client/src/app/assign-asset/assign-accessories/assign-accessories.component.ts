import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-accessories',
  templateUrl: './assign-accessories.component.html',
  styleUrls: ['./assign-accessories.component.css']
})
export class AssignAccessoriesComponent {
  @Input() AccessoryOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  SelectedAccessories: any;

  AccessorySearchBoxOptionSelected(event: any): void {
    this.SelectedAccessories = event;
  }
  onInputChangeCommentBox(event: any): void {
    this.assignAssetForm.get('accessoryComment')?.setValue(event.target.value);
  }
}
