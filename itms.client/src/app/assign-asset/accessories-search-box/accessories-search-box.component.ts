import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

@Component({
  selector: 'app-accessories-search-box',
  templateUrl: './accessories-search-box.component.html',
  styleUrls: ['./accessories-search-box.component.css']
})
export class AccessoriesSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() AccessoryOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() AccessoryOptionSelected: EventEmitter<any> = new EventEmitter();
  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService) { }

  onSelectOption(option: any): void {
    this.AccessoryOptionSelected.emit(option);
    if (option.assignedTo && 'assignedTo' in option && option.assignedTo) {
      this.selectedOption = null;
      this.assignAssetForm.get('selectedAccessory')?.setValue(null);
    }
    else {
      this.selectedOption = option;
      this.assignAssetForm.get('selectedAccessory')?.setValue(option.id);
    }
  }
  onClearSelection(): void {
    this.assignAssetForm.get('selectedAccessory')?.setValue(null);
  }

  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("accessory");
    this.AccessoryOptionSelected.emit(this.selectedOption);
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setState("accessory", this.selectedOption);
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
  }
  resetComponentState(): void {
    this.selectedOption = null;
  }
}
