import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

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
  SoftwareVersionOptions: Set<string>;
  FileredSoftwareOptions: any[] = [];
  selectedOption: any;
  SelectedSoftwareData: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService
) { }

  SoftwareSearchBoxOptionSelected(event: any): void {
    this.SelectedSoftware = event;
    this.filterSoftwareVersions();
  }

  filterSoftwareVersions(): void {
    if (this.SelectedSoftware) {
      this.FileredSoftwareOptions = this.SoftwareOptions.filter(opt => opt.softwareName === this.SelectedSoftware);
      this.SelectedSoftwareData = this.FileredSoftwareOptions[0];
      this.SoftwareVersionOptions = new Set<string>(this.FileredSoftwareOptions.map(option => option.version));
    }
    else {
        this.SoftwareVersionOptions;
      }
  }
  SoftwareVersionSearchBoxOptionSelected(event: any): void {
    console.log(this.FileredSoftwareOptions);
    const filteredOptions = this.FileredSoftwareOptions.filter(
      (option: any) => option.version === event && option.assignedTo === null
    );
    console.log(filteredOptions);
    if (filteredOptions.length > 0) {
      this.SelectedSoftwareVersion = filteredOptions[0];
      this.assignAssetForm.get('softwareId')?.setValue(this.SelectedSoftwareVersion.id);
    }
    else {
      this.SelectedSoftwareVersion = 1;
        this.assignAssetForm.get('softwareId')?.setValue(null);
    }
  }
  onInputChangeCommentBox(event: any): void {
    this.selectedOption = event.target.value;
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
  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("softwareComment");
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("softwareComment", this.selectedOption);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  setSaveStateOnDestroy(): void {
    this.assignDataManagementService.setState("softwareComment", this.selectedOption);
  }
}
