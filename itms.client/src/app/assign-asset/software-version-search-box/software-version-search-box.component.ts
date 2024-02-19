import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-software-version-search-box',
  templateUrl: './software-version-search-box.component.html',
  styleUrls: ['./software-version-search-box.component.css']
})
export class SoftwareVersionSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareVersionOptions: string[] = [];
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();

  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService
) { }

  onSelectOption(option: any): void {
    console.log(this.SoftwareVersionOptions);
    const data = { option: option, index: this.index };
    this.SoftwareVersionOptionSelected.emit(data);
  }
  onClearSelection(): void {
    this.selectedOption = null;
    const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;
    const index = softwareIdsArray.controls.findIndex(control => control.value.index === this.index);
    if (index !== -1) {
      softwareIdsArray.removeAt(index);
      this.selectedOption = null;
    }
    const data = { option: null, index: this.index };
    this.SoftwareVersionOptionSelected.emit(data);
  }

  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("softwareVersions",this.index);
    if (this.selectedOption)
      this.SoftwareVersionOptionSelected.emit(this.selectedOption);
  }
  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("softwareVersions", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  //setSaveStateOnDestroy(): void {
  //  this.selectedOption = null;
  //}
  
}
