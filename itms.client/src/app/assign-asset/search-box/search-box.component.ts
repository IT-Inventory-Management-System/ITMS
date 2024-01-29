import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: any[] = [];
  @Input() assignAssetForm: FormGroup;

  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService) { }

  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("assignedTo");
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setState("assignedTo", this.selectedOption);
  }
  onSelectOption(option: any): void {
    this.assignAssetForm.get('assignedTo')?.setValue(option.id);
  }
  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
  }

  onClearSelection(): void {
    this.assignAssetForm.get('assignedTo')?.setValue(null);
  }

  //searchText: string = '';
  //filteredOptions: any[] = [];

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
