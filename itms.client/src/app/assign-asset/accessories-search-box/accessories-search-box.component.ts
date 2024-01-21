import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  searchText: string = '';
  filteredOptions: any[] = [];
  selectedOption: any;

  constructor(private elementRef: ElementRef) { }

  onInputChange(event: any): void {
    this.searchText = event.target.value;
    this.filterOptions();
  }

  filterOptions(): void {
    this.filteredOptions = this.AccessoryOptions.filter(AccessoryOption =>
      AccessoryOption.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  selectOption(option: any): void {
    this.AccessoryOptionSelected.emit(option);
    this.selectedOption = `${option.name}`;
    this.filteredOptions = [];
    this.assignAssetForm.get('selectedAccessory')?.setValue(option.id);
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      //if (this.selectedOption && this.selectedOption !== this.searchText) {
      //  this.searchText = "";
      //  this.selectedOption = "";
      //} else if (!this.selectedOption && this.searchText) {
      //  this.searchText = "";
      //}
      //console.log('Search Text:', this.searchText);
      //console.log('Selected Option:', this.selectedOption);
      this.filteredOptions = [];
    }
  }
}
