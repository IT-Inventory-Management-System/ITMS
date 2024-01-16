import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: any[] = [];
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();

  searchText: string = '';
  filteredOptions: any[] = [];

  onInputChange(event: any): void {
    this.searchText = event.target.value;
    this.filterOptions();
  }


  filterOptions(): void {
    console.log('Search Text:', this.searchText);
    console.log('All Options:', this.options);
    this.filteredOptions = this.options.filter(option =>
      option.cgiid.toLowerCase().includes(this.searchText.toLowerCase()) ||
      option.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      option.lastName.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log('Filtered Options:', this.filteredOptions);
  }

  selectOption(option: any): void {
    this.optionSelected.emit(option);
  }
}
