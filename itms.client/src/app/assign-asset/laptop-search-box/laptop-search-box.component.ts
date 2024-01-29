import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

@Component({
  selector: 'app-laptop-search-box',
  templateUrl: './laptop-search-box.component.html',
  styleUrls: ['./laptop-search-box.component.css']
})
export class LaptopSearchBoxComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() LaptopOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() LaptopOptionSelected: EventEmitter<any> = new EventEmitter();

  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService) { }

  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("cygid");
    this.LaptopOptionSelected.emit(this.selectedOption);
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setState("cygid", this.selectedOption);
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
  }

  onClearSelection(): void {
    this.selectedOption = null;
    this.assignAssetForm.get('cygid')?.setValue(null);
  }

  onSelectOption(option: any): void {
    //this.selectedOption = `${option.cygid} - ${ option.deviceName }`;
    //`${option.cgiid} - ${option.firstName} ${option.lastName}`;
    this.LaptopOptionSelected.emit(option);
    if (option.assignedTo && 'assignedTo' in option && option.assignedTo) {
      this.selectedOption = null;
      this.assignAssetForm.get('cygid')?.setValue(null);
    }
    else {
      this.selectedOption = option;
      this.assignAssetForm.get('cygid')?.setValue(option.cygid);
    }
  }


  //searchText: string = '';
  //filteredOptions: any[] = [];


  //ngOnInit(): void {
  //  this.filterOptions();
  //}

  //onInputChange(event: any): void {
  //  console.log(this.LaptopOptions);

  //  this.searchText = event;
  //  this.filterOptions();
  //}

  //filterOptions(): void {
  //  console.log(this.LaptopOptions);
  //  this.filteredOptions = this.LaptopOptions.filter(LaptopOption =>
  //    LaptopOption.cygid.toLowerCase().includes(this.searchText.toLowerCase()));
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
