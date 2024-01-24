import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-software',
  templateUrl: './assign-software.component.html',
  styleUrls: ['./assign-software.component.css']
})
export class AssignSoftwareComponent {

  @Input() SoftwareOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;

  SelectedSoftware: any;
  SelectedSoftwareVersion: any;
  SoftwareVersionOptions: any[] = [];

  SoftwareSearchBoxOptionSelected(event: any): void {
    this.SelectedSoftware = event;
    this.filterSoftwareVersions();
  }

  filterSoftwareVersions(): void {
    if (this.SelectedSoftware) {
      const selectedSoftwareName = this.SelectedSoftware.softwareName;
      const versionsWithSameName = this.SoftwareOptions
        .filter(software => software.softwareName === selectedSoftwareName)
        .map(software => ({
          version: software.version,
          id: software.id,
          expiryDate: this.formatExpiryDate(software.expiryDate)
        }));
      this.SoftwareVersionOptions = versionsWithSameName || [];
      console.log("SoftwareVersionOptions", this.SoftwareVersionOptions);

    } else {
      this.SoftwareVersionOptions = [];
    }
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
