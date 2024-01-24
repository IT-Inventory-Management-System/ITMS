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
  formattedAge: string = '';

  LaptopSearchBoxOptionSelected(event: any): void {
    this.SelectedLaptop = event;
    this.calculateFormattedAge();
  }
  onInputChangeCommentBox(event: any): void {
    this.assignAssetForm.get('deviceComment')?.setValue(event.target.value);
  }
  calculateFormattedAge(): void {
    if (this.SelectedLaptop?.age !== undefined) {
      this.formattedAge = this.SelectedLaptop.age.toFixed(1);
    }
  }
}
