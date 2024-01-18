import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

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
  selectedOption: any;


  constructor(private elementRef: ElementRef) { }

  onInputChange(event: any): void {
    //console.log(event.target.value);
    this.searchText = event.target.value;
    this.filterOptions();
  }


  //filterOptions(): void {
  //  //console.log('Search Text:', this.searchText);
  //  //console.log('All Options:', this.options);
  //  this.filteredOptions = this.options.filter(option =>
  //    option.cgiid.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //    option.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //    option.lastName.toLowerCase().includes(this.searchText.toLowerCase())
  //  );
  //  //console.log('Filtered Options:', this.filteredOptions);
  //}
  filterOptions(): void {
      this.filteredOptions = this.options.filter(option =>
        (option.cgiid && option.cgiid.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (option.firstName && option.firstName.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (option.lastName && option.lastName.toLowerCase().includes(this.searchText.toLowerCase()))
      );

  }


  selectOption(option: any): void {
    this.optionSelected.emit(option);
    this.searchText = `${option.cgiid} - ${option.firstName} ${option.lastName}`;
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
      //console.log('Search Text:', this.searchText);
      //console.log('Selected Option:', this.selectedOption);
      this.filteredOptions = [];
    }
    //if (!clickedInside) {
    //  if (!this.selectedOption) {
    //    this.searchText = ''; // Clear searchText if no option was selected
    //  }
    //  this.filteredOptions = [];
    //}
  //ngAfterViewInit() {
  //  this.documentClickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
  //    const clickedInside = this.elementRef.nativeElement.contains(event.target);
  //    if (!clickedInside) {
  //      if (!this.selectedOption) {
  //        this.searchText = '';
  //      }
  //      this.filteredOptions = [];
  //    }
  //  });
  //}
  //  ngOnDestroy() {
  //    if (this.documentClickListener) {
  //      this.documentClickListener();
  //    }
  //  }
  }
}
