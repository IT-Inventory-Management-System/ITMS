import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-software-version-search-box',
  templateUrl: './software-version-search-box.component.html',
  styleUrls: ['./software-version-search-box.component.css']
})

export class SoftwareVersionSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareVersionOptions: any[] = [];
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();

  searchText: string = '';
  filteredOptions: any[] = [];
  selectedOption: any;


  constructor(private elementRef: ElementRef) { }

  onLaptopInputChange(event: any): void {
    console.log('onLaptopInputChange called');
    this.searchText = event.target.value;
    this.filterLaptopOptions();
  }


  filterLaptopOptions(): void {
    console.log('Search Text:', this.searchText);
    console.log('All Options:', this.SoftwareVersionOptions);
    this.filteredOptions = this.SoftwareVersionOptions.filter(SoftwareVersionOptions =>
      SoftwareVersionOptions.softwareVersion.toLowerCase().includes(this.searchText.toLowerCase()));

    console.log('Filtered Options:', this.filteredOptions);
  }

  selectOption(option: any): void {
    this.SoftwareVersionOptionSelected.emit(option);
    this.searchText = `${option.softwareVersion}`;
    this.selectedOption = this.searchText;
    this.filteredOptions = [];
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      if (this.selectedOption && this.selectedOption !== this.searchText) {
        this.searchText = "";
        this.selectedOption = "";
      } else if (!this.selectedOption && this.searchText) {
        this.searchText = "";
      }
      console.log('Search Text:', this.searchText);
      console.log('Selected Option:', this.selectedOption);
      this.filteredOptions = [];
    }
  }
}
