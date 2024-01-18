import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-software-search-box',
  templateUrl: './software-search-box.component.html',
  styleUrls: ['./software-search-box.component.css']
})
export class SoftwareSearchBoxComponent {
@Input() label: string;
@Input() placeholder: string;
@Input() SoftwareOptions: any[] = [];
@Output() SoftwareOptionSelected: EventEmitter<any> = new EventEmitter();

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
  console.log('All Options:', this.SoftwareOptions);
  this.filteredOptions = this.SoftwareOptions.filter(SoftwareOption =>
    SoftwareOption.softwareName.toLowerCase().includes(this.searchText.toLowerCase()));

  console.log('Filtered Options:', this.filteredOptions);
}

selectOption(option: any): void {
  this.SoftwareOptionSelected.emit(option);
  this.searchText = `${option.softwareName}`;
  this.selectedOption = this.searchText;
  this.filteredOptions = [];
}

@HostListener('document:click', ['$event'])
handleDocumentClick(event: MouseEvent): void {
  const clickedInside = this.elementRef.nativeElement.contains(event.target);
  if(!clickedInside) {
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
