import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-accessories-search-box',
  templateUrl: './accessories-search-box.component.html',
  styleUrls: ['./accessories-search-box.component.css']
})
export class AccessoriesSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() AccessoryOptions: any[] = [];
  @Output() AccessoryOptionSelected: EventEmitter<any> = new EventEmitter();

  searchText: string = '';
  filteredOptions: any[] = [];
  selectedOption: any;


  constructor(private elementRef: ElementRef) { }

  onInputChange(event: any): void {
    console.log(event.target.value);
    this.searchText = event.target.value;
    this.filterOptions();
  }


  filterOptions(): void {
    console.log('Search Text:', this.searchText);
    console.log('All Options:', this.AccessoryOptions);
    this.filteredOptions = this.AccessoryOptions.filter(AccessoryOption =>
      AccessoryOption.AccessoryName.toLowerCase().includes(this.searchText.toLowerCase()));
    console.log('Filtered Options:', this.filteredOptions);
  }

  selectOption(option: any): void {
    this.AccessoryOptionSelected.emit(option);
    this.searchText = `${option.softwareName}`;
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
