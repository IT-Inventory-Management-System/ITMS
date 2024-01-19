import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-accessories',
  templateUrl: './assign-accessories.component.html',
  styleUrls: ['./assign-accessories.component.css']
})
export class AssignAccessoriesComponent {
  @Input() AccessoryOptions: any[] = [];
  @Output() AccessoryOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() AccessoryComment: EventEmitter<any> = new EventEmitter();
  @Input() ControlNameSelectedAccessory: FormGroup;

  SelectedAccessories: any;
  AccessorySearchBoxOptionSelected(event: any): void {
    //console.log('LaptopSearchBoxOptionSelected', event);
    this.SelectedAccessories = event;
    this.AccessoryOptionSelected.emit(event);
  }
  CommentBox(event: any): void {
    console.log('AccessoryCommentBox', event);
    this.AccessoryComment.emit(event);
  }
}
