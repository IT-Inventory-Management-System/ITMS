import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-software',
  templateUrl: './assign-software.component.html',
  styleUrls: ['./assign-software.component.css']
})
export class AssignSoftwareComponent {

  @Input() SoftwareOptions: any[] = [];
  @Input() SoftwareVersionOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() SoftwareOptionSelected: EventEmitter<any> = new EventEmitter();

  SelectedSoftware: any;
  SelectedSoftwareVersion: any;

  SoftwareSearchBoxOptionSelected(event: any): void {
    this.SelectedSoftware = event;
    this.SoftwareOptionSelected.emit(event);
  }
  SoftwareVersionSearchBoxOptionSelected(event: any): void {
    this.SelectedSoftwareVersion = event;
  }
  onInputChangeCommentBox(event: any): void {
    this.assignAssetForm.get('softwareComment')?.setValue(event.target.value);
  }
  formatExpiryDate(expiryDate: string): string {
    if (!expiryDate) {
      return '';
    }
    const date = new Date(expiryDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

}
