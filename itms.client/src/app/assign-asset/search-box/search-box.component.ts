import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: any[] = [];
  @Input() assignAssetForm: FormGroup; 

  //searchText: string = '';
  //filteredOptions: any[] = [];
  selectedOption: any;

  //constructor(private elementRef: ElementRef) { }

  //onInputChange(event: any): void {
  //  this.searchText = event.target.value;
  //  this.filterOptions();
  //}

  //filterOptions(): void {
  //    this.filteredOptions = this.options.filter(option =>
  //      (option.cgiid && option.cgiid.toLowerCase().includes(this.searchText.toLowerCase())) ||
  //      (option.firstName && option.firstName.toLowerCase().includes(this.searchText.toLowerCase())) ||
  //      (option.lastName && option.lastName.toLowerCase().includes(this.searchText.toLowerCase()))
  //    );
  //}

  //selectOption(option: any): void {
  //  this.selectedOption = `${option.cgiid} - ${option.firstName} ${option.lastName}`;
  //  this.filteredOptions = [];
  //  this.assignAssetForm.get('assignedTo')?.setValue(option.id);
  //}
  onSelectOption(option: any): void {
      this.assignAssetForm.get('assignedTo')?.setValue(option.id);
  }

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
