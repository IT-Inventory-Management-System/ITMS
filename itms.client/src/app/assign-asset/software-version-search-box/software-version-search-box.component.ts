import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-software-version-search-box',
  templateUrl: './software-version-search-box.component.html',
  styleUrls: ['./software-version-search-box.component.css']
})

export class SoftwareVersionSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareVersionOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();

  //searchText: string = '';
  //filteredOptions: any[] = [];
  selectedOption: any;
  onSelectOption(option: any): void {
    this.SoftwareVersionOptionSelected.emit(this.selectedOption);
    this.assignAssetForm.get('softwareId')?.setValue(option.id);
  }

  //constructor(private elementRef: ElementRef) { }

  //onLaptopInputChange(event: any): void {
  //  this.searchText = event.target.value;
  //  this.filterLaptopOptions();
  //}

  //filterLaptopOptions(): void {
  //  this.filteredOptions = this.SoftwareVersionOptions.filter(SoftwareVersionOptions =>
  //    SoftwareVersionOptions.softwareVersion.toLowerCase().includes(this.searchText.toLowerCase()));
  //}

  //selectOption(option: any): void {
  //  this.SoftwareVersionOptionSelected.emit(option);
  //  this.selectedOption = `${option.softwareVersion}`;
  //  this.filteredOptions = [];
  ////  this.assignAssetForm.get('selectedSoftwareVersion')?.setValue(option.id);
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
