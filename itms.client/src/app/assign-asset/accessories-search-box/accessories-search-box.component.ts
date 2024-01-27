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

  //searchText: string = '';
  //filteredOptions: any[] = [];
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
  //constructor(private elementRef: ElementRef) { }

  //onInputChange(event: any): void {
  //  this.searchText = event.target.value;
  //  this.filterOptions();
  //}

  //filterOptions(): void {
  //  this.filteredOptions = this.AccessoryOptions.filter(AccessoryOption =>
  //    AccessoryOption.name.toLowerCase().includes(this.searchText.toLowerCase()));
  //}

  //selectOption(option: any): void {
  //  this.AccessoryOptionSelected.emit(option);
  //  this.selectedOption = `${option.name}`;
  //  this.filteredOptions = [];
  ////  this.assignAssetForm.get('selectedAccessory')?.setValue(option.id);
  //}

  //@HostListener('document:click', ['$event'])
  //handleDocumentClick(event: MouseEvent): void {
  //  const clickedInside = this.elementRef.nativeElement.contains(event.target);
  //  if (!clickedInside) {
  //    //if (this.selectedOption && this.selectedOption !== this.searchText) {
  //    //  this.searchText = "";
  //    //  this.selectedOption = "";
  //    //} else if (!this.selectedOption && this.searchText) {
  //    //  this.searchText = "";
  //    //}
  //    //console.log('Search Text:', this.searchText);
  //    //console.log('Selected Option:', this.selectedOption);
  //    this.filteredOptions = [];
  //  }
  //}
}
