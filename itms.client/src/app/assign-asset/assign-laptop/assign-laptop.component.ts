import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-assign-laptop',
  templateUrl: './assign-laptop.component.html',
  styleUrls: ['./assign-laptop.component.css']
})
export class AssignLaptopComponent {
  @Input() LaptopOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  SelectedLaptop: any;

  LaptopSearchBoxOptionSelected(event: any): void {
    this.SelectedLaptop = event;
  }
  onInputChangeCommentBox(event: any): void {
    this.assignAssetForm.get('laptopComment')?.setValue(event.target.value);
  }
}
