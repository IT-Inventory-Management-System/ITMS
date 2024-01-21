import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-laptop-search-box',
  templateUrl: './laptop-search-box.component.html',
  styleUrls: ['./laptop-search-box.component.css']
})
export class LaptopSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() LaptopOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() LaptopOptionSelected: EventEmitter<any> = new EventEmitter();

  searchText: string = '';
  filteredOptions: any[] = [];
  selectedOption: any;
  constructor(private elementRef: ElementRef) { }

  onInputChange(event: any): void {
    this.searchText = event.target.value;
    this.filterOptions();
  }

  filterOptions(): void {
    this.filteredOptions = this.LaptopOptions.filter(LaptopOption =>
      LaptopOption.cygid.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  selectOption(option: any): void {
    this.selectedOption = `${option.cygid} - ${ option.deviceName }`;
    `${option.cgiid} - ${option.firstName} ${option.lastName}`;
    this.LaptopOptionSelected.emit(option);
    this.filteredOptions = [];
    this.assignAssetForm.get('selectedLaptop')?.setValue(option.cygid);
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
