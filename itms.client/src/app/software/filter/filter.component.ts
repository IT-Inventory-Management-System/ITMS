import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SelectedCountryService } from '../../shared/services/selected-country.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


 
  SoftwareType: string[] = ["Perpetual", "Validity", "Subscription"];
  SoftwareStatus: string[] = ["Active", "Archive"];
  StockStatus: string[] = ["Low In Stock", "Out Of Stock", "In Stock"];

  @Output() applyClicked: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('toInput') toInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fromInput') fromInput!: ElementRef<HTMLInputElement>;

  stat: string = "";
  selectedStock: string[] = [];
  from: Date | null;
  to: Date | null;
  selectedLocation: any = '';
  selectedTypes: string[] = [];

  constructor(private selectedCountryService: SelectedCountryService) { }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      this.selectedTypes = [];
      this.selectedStock = [];
      this.stat = '',
      this.from = null;
      this.to = null;
      if (this.toInput) {
        this.toInput.nativeElement.value = '';
      }
      if (this.fromInput) {
        this.fromInput.nativeElement.value = '';
      }
      this.Apply();
    });

  }

  isSelectedType(status: string): boolean {
    return this.selectedTypes.includes(status);
  }

  toggleCheckboxType(status: string): void {
    if (this.isSelectedType(status)) {
      this.selectedTypes = this.selectedTypes.filter(type => type !== status);
    } else {
      this.selectedTypes.push(status);
    }
  }

  isSelectedStock(status: string): boolean {
    return this.selectedStock.includes(status);
  }

  toggleCheckboxStock(status: string): void {
    if (this.isSelectedStock(status)) {
      this.selectedStock = this.selectedStock.filter(stock => stock !== status);
    } else {
      this.selectedStock.push(status);
    }
  }

  toggleCheckboxStatus(status: string) {
    this.stat = (this.stat === status) ? "" : status;
   // console.log(this.stat);
  }

  toggleInputType(type: string) {
    const inputElement = document.querySelector('#from');
    if (inputElement) {
      inputElement.setAttribute('type', type);
    }
  }

  toggleCheckboxFrom(value: string) {
    this.from = new Date(value);
    const formattedDate = this.from.toISOString().split('T')[0];
   // console.log(formattedDate);
  }

  toggleInputTypeTo(type: string) {
    const inputElement = document.querySelector('#to');
    if (inputElement) {
      inputElement.setAttribute('type', type);
    }
  }

  toggleCheckboxTo(value: string) {
    this.to = new Date(value);
    const formattedDate = this.to.toISOString().split('T')[0];
   // console.log(formattedDate);
  }

  Apply() {
    this.applyClicked.emit({
      selectedTypes: this.selectedTypes,
      stat: this.stat,
      selectedStock: this.selectedStock,
      from: this.from,
      to: this.to,
      filter: true,
    });
  }
}
