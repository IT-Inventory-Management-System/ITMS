import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

@Component({
  selector: 'app-software-version-search-box',
  templateUrl: './software-version-search-box.component.html',
  styleUrls: ['./software-version-search-box.component.css']
})
export class SoftwareVersionSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareVersionOptions:Set<string>;
  @Input() assignAssetForm: FormGroup;
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();

  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService) { }

  onSelectOption(option: any): void {
    this.SoftwareVersionOptionSelected.emit(option);
  }
  onClearSelection(): void {
    this.assignAssetForm.get('softwareId')?.setValue(null);
  }

  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("softwareVersion");
    if (this.selectedOption)
      this.SoftwareVersionOptionSelected.emit(this.selectedOption);
  }
  ngOnDestroy(): void {
    this.assignDataManagementService.setState("softwareVersion", this.selectedOption);
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
  }
  
}
