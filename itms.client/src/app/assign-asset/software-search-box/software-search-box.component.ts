import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  //searchText: string = '';
  //filteredOptions: any[] = [];
  selectedOption: any;
  onSelectOption(option: any): void {
    this.SoftwareOptionSelected.emit(this.selectedOption);
  }
  //constructor(private elementRef: ElementRef) { }

  //onSoftwareInputChange(event: any): void {
  //  this.searchText = event.target.value;
  //  this.filterSoftwareOptions();
  //}

  //filterSoftwareOptions(): void {
  //  this.filteredOptions = this.SoftwareOptions.filter(SoftwareOption =>
  //    SoftwareOption.softwareName.toLowerCase().includes(this.searchText.toLowerCase()));
  //}

  //selectOption(option: any): void {
  //  this.selectedOption = option.softwareName;
  //  this.SoftwareOptionSelected.emit(option);
  //  this.filteredOptions = [];
  //  this.assignAssetForm.get('softwareId')?.setValue(option.id);
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
